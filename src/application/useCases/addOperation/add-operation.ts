import { Either, left, right } from '../../../@shared/either';
import { Result } from '../../../@shared/result';
import { Operation } from '../../../domain/entities/operation';
import { AddOperationContract } from '../../../infra/contracts/add-operation.contract';
import { ValidationFailedError } from '../../errors/validationFailedError';
import { IOperationRepository } from '../../repositories/operation-repository.interface';
import { IUserRepository } from '../../repositories/user-repository.interface';
import { AddOperationDto } from './add-operation.dto';
import { IAddOperation } from './add-operation.interface';

export class AddOperationToUser implements IAddOperation {
  private _userRepository: IUserRepository;
  private _operationRepository: IOperationRepository;

  constructor(userRepository: IUserRepository,
    operationRepository: IOperationRepository) {
    this._userRepository = userRepository;
    this._operationRepository = operationRepository;
  }

  async handle(addOperationDto: AddOperationDto): Promise<Result<Operation>> {
    await this.validate(addOperationDto);
    const operation = await this.addOperation(addOperationDto);
    const resultSucess = new Result((operation.value as Operation), 'operation added successfully', true, []);
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

    const operationCreated = await this._operationRepository.add(operationOrError.value) as Operation;
    return right(operationCreated);
  }

  private async findUser(userId: string) {
    const userFound = await this._userRepository.getById(userId);

    if (!userFound) {
      throw new ValidationFailedError('fail to add operation', { name: 'user', message: 'non-existent user' });
    }

    return userFound;
  }
}
