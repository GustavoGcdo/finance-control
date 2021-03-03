import { ValidationFailedError } from '../../../infra/errors/validationFailedError';
import { Result } from '../../../infra/models/result';
import { Either, left, right } from '../../shared/models/either';
import { IUserRepository } from '../../users/repositories/user-repository.interface';
import { AddOperationContract } from '../contracts/add-operation.contract';
import { Operation } from '../domain/entities/operation';
import { AddOperationDto } from '../dtos/add-operation.dto';
import { IOperationRepository } from '../repositories/operation-repository.interface';
import { IAddOperation } from './add-operation.interface';

export class AddOperationToUser implements IAddOperation {
  private _userRepository: IUserRepository;
  private _operationRepository: IOperationRepository;

  constructor(userRepository: IUserRepository,
    operationRepository: IOperationRepository) {
    this._userRepository = userRepository;
    this._operationRepository = operationRepository;
  }

  async handle(addOperationDto: AddOperationDto): Promise<Result<null>> {
    await this.validate(addOperationDto);
    await this.addOperation(addOperationDto);
    const resultSucess = new Result(null, 'operation added successfully', true, []);
    return resultSucess;
  }

  private async validate(addOperationDto: AddOperationDto) {
    this.validateContract(addOperationDto);
  }

  private validateContract(addOperationDto: AddOperationDto) {
    const contract = new AddOperationContract(addOperationDto);
    const isInvalid = !contract.validate();

    if (isInvalid) {
      throw new ValidationFailedError('fail to add operation', ...contract.reports);
    }
  }

  async addOperation(addOperationDto: AddOperationDto): Promise<Either<ValidationFailedError, Operation>> {
    const { userId } = addOperationDto;
    const userToAddOperation = await this.findUser(userId);

    const operationOrError = Operation.create({
      category: addOperationDto.category,
      date: addOperationDto.date,
      description: addOperationDto.description,
      executed: addOperationDto.executed,
      type: addOperationDto.type,
      user: userToAddOperation,
      value: addOperationDto.value
    });

    if (operationOrError.isLeft()) {
      return left(new ValidationFailedError('fail to add operation'));
    }

    userToAddOperation.addOperation(operationOrError.value);

    await this._operationRepository.add(operationOrError.value);
    await this._userRepository.updateBalance(userId, userToAddOperation.balance);

    return right(operationOrError.value);
  }

  private async findUser(userId: string) {
    const userFound = await this._userRepository.getById(userId);

    if (!userFound) {
      throw new ValidationFailedError('fail to add operation', { name: 'user', message: 'non-existent user' });
    }

    return userFound;
  }
}
