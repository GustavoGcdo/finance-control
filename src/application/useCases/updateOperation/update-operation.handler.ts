import { Result } from '../../../@shared/result';
import { Operation } from '../../../domain/entities/operation';
import { OperationType } from '../../../domain/valueObjects/operation-type';
import { UpdateOperationContract } from '../../../infra/contracts/update-operation.contract';
import { ValidationFailedError } from '../../errors/validationFailedError';
import { IOperationRepository } from '../../repositories/operation-repository.interface';
import { IUserRepository } from '../../repositories/user-repository.interface';
import { IUpdateOperationHandler } from './update-operation-handler.interface';
import { UpdateOperationDto } from './update-operation.dto';

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
    this.getOperationWithNewValues(updateOperationDto, operation);
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

  private async findOperation(id: string) {
    const operationFound = await this._operationRepository.getById(id);

    if (!operationFound) {
      throw new ValidationFailedError('fail to update operation', { name: 'user', message: 'non-existent operation' });
    }

    return operationFound;
  }
}
