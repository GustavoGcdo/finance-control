import { ValidationFailedError } from '../../../infra/errors/validationFailedError';
import { Result } from '../../../infra/models/result';
import { IUserRepository } from '../../users/repositories/user-repository.interface';
import { UpdateOperationContract } from '../contracts/update-operation.contract';
import { Operation } from '../domain/entities/operation';
import { EOperationType } from '../domain/enums/operation-type.enum';
import { OperationType } from '../domain/valueObjects/operation-type';
import { UpdateOperationDto } from '../dtos/update-operation.dto';
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

    const operation = await this.findOperation(operationId);
    const oldOperation = Object.assign(operation, {});
    this.getOperationWithNewValues(updateOperationDto, operation);

    await this.updateUserExtract(operation, oldOperation);
    await this._operationRepository.update(operation);
  }

  private getOperationWithNewValues(updateOperationDto: UpdateOperationDto, operationToUpdate: Operation): Operation {
    const { executed, category, description, value, type, date } = updateOperationDto;


    if (executed !== undefined) {
      operationToUpdate.executed = executed;
    }

    if (category) {
      operationToUpdate.category = category;
    }

    if (description) {
      operationToUpdate.description = description;
    }

    if (value) {
      operationToUpdate.value = Number(value);
    }

    if (type) {
      const typeOrError = OperationType.create(type);

      if (typeOrError.isRight()) {
        operationToUpdate.type = typeOrError.value;
      }
    }

    if (date) {
      operationToUpdate.date = new Date(date);
    }

    return operationToUpdate;
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

    if (executed && type.value === EOperationType.EXPENSE) {
      newBalance -= value;
    }

    if (executed && type.value === EOperationType.RECIPE) {
      newBalance += value;
    }
    return newBalance;
  }

  private revertBalanceWithOldOperation(oldOperation: Operation, oldBalance: number) {
    const { executed, type, value } = oldOperation;
    let revertedBalance = oldBalance;

    if (executed && type.value === EOperationType.EXPENSE) {
      revertedBalance += value;
    }

    if (executed && type.value === EOperationType.RECIPE) {
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
