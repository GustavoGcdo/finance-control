import { ValidationFailedError } from '../../../infra/errors/validationFailedError';
import { Result } from '../../../infra/models/result';
import { IUserRepository } from '../../users/repositories/user-repository.interface';
import { UpdateOperationContract } from '../contracts/update-operation.contract';
import { UpdateOperationDto } from '../dtos/update-operation.dto';
import { Operation } from '../models/entities/operation';
import { OperationType } from '../models/enums/operation-type.enum';
import { IOperationRepository } from '../repositories/operation-repository.interface';
import { IUpdateOperationHandler } from './update-operation-handler.interface';

export class UpdateOperationHandler implements IUpdateOperationHandler {
  private _userRepository: IUserRepository;
  private _operationRepository: IOperationRepository;

  constructor(userRepository: IUserRepository,
    operationRepository: IOperationRepository) {
    this._userRepository = userRepository;
    this._operationRepository = operationRepository;
  }

  async handle(updateOperationDto: UpdateOperationDto): Promise<Result<null>> {
    await this.validate(updateOperationDto);
    await this.updateOperation(updateOperationDto);
    const resultSucess = new Result(null, 'operation updated successfully', true, []);
    return resultSucess;
  }

  private async validate(updateOperationDto: UpdateOperationDto) {
    this.validateContract(updateOperationDto);
  }

  private validateContract(updateOperationDto: UpdateOperationDto) {
    const contract = new UpdateOperationContract(updateOperationDto);
    const isInvalid = !contract.validate();

    if (isInvalid) {
      throw new ValidationFailedError('fail to add operation', ...contract.reports);
    }
  }

  async updateOperation(updateOperationDto: UpdateOperationDto) {
    const { operationId } = updateOperationDto;

    const oldOperation = await this.findOperation(operationId);
    const updatedOperation = this.getOperationWithNewValues(updateOperationDto, oldOperation);

    if (updatedOperation.executed || updatedOperation.value || updateOperationDto.type) {
      await this.updateUserExtract(updatedOperation, oldOperation);
    }

    await this._operationRepository.update(updatedOperation);
  }

  private getOperationWithNewValues(updateOperationDto: UpdateOperationDto, operationToUpdate: Operation): Operation {
    const { executed, category, description, value, type, date } = updateOperationDto;
    const operationUpdated = { ...operationToUpdate };

    if (executed !== undefined) {
      operationUpdated.executed = executed;
    }

    if (category) {
      operationUpdated.category = category;
    }

    if (description) {
      operationUpdated.description = description;
    }

    if (value) {
      operationUpdated.value = value;
    }

    if (type) {
      operationUpdated.type = type as OperationType;
    }

    if (date) {
      operationUpdated.date = new Date(date);
    }

    return operationUpdated;
  }

  private async updateUserExtract(newOperation: Operation, oldOperation: Operation) {
    const userToAddOperation = await this.findUser(newOperation.user._id);

    let newBalanceValue = userToAddOperation.balance;
    newBalanceValue = this.revertBalanceWithOldOperation(oldOperation, userToAddOperation.balance);
    newBalanceValue = this.getNewBalanceWithNewOperation(newOperation, userToAddOperation.balance);

    await this._userRepository.updateBalance(newOperation.user._id, newBalanceValue);
  }

  private getNewBalanceWithNewOperation(newOperation: Operation, oldBalance: number) {
    const { executed, type, value } = newOperation;
    let newBalance = oldBalance;

    if (executed && type === OperationType.EXPENSE) {
      newBalance -= value;
    }

    if (executed && type === OperationType.RECIPE) {
      newBalance += value;
    }
    return newBalance;
  }

  private revertBalanceWithOldOperation(oldOperation: Operation, oldBalance: number) {
    const { executed, type, value } = oldOperation;
    let revertedBalance = oldBalance;

    if (executed && type === OperationType.EXPENSE) {
      revertedBalance += value;
    }

    if (executed && type === OperationType.RECIPE) {
      revertedBalance -= value;
    }

    return revertedBalance;
  }

  private async findUser(userId: string) {
    const userFound = await this._userRepository.getById(userId);

    if (!userFound) {
      throw new ValidationFailedError('fail to update operation', { name: 'user', message: 'non-existent user' });
    }

    return userFound;
  }

  private async findOperation(id: string) {
    const operationFound = await this._operationRepository.getById(id);

    if (!operationFound) {
      throw new ValidationFailedError('fail to update operation', { name: 'user', message: 'non-existent operation' });
    }

    return operationFound;
  }
}
