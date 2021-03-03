import { ValidationFailedError } from '../../../infra/errors/validationFailedError';
import { Result } from '../../../infra/models/result';
import { IUserRepository } from '../../users/repositories/user-repository.interface';
import { GetUserOperationsContract } from '../contracts/get-user-operations.contract';
import { GetUserOperationsDto } from '../dtos/get-user-operations.dto';
import { PaginateOperationsDto } from '../dtos/pagintate-operations.dto';
import { IOperationRepository } from '../repositories/operation-repository.interface';
import { IGetUserOperations } from './get-user-operations.interface';

export class GetUserOperations implements IGetUserOperations {
    private _operationRepository: IOperationRepository;
    private _userRepository: IUserRepository;

    constructor(
      operationRepository: IOperationRepository,
      userRepository: IUserRepository
    ) {
      this._operationRepository = operationRepository;
      this._userRepository = userRepository;
    }

    async handle(getUserOperationsDto: GetUserOperationsDto): Promise<Result<PaginateOperationsDto>> {
      this.validate(getUserOperationsDto);
      const operations = await this.getOperations(getUserOperationsDto);
      const returnObject = { results: operations };
      const resultSuccess = new Result(returnObject, 'success on fetch user operations', true, []);
      return resultSuccess;
    }

    private validate(getUserOperationsDto: GetUserOperationsDto) {
      this.validateContract(getUserOperationsDto);
    }

    private validateContract(getUserOperationsDto: GetUserOperationsDto) {
      const contract = new GetUserOperationsContract(getUserOperationsDto);
      const isInvalid = !contract.validate();

      if (isInvalid) {
        throw new ValidationFailedError('fail to get operations', ...contract.reports);
      }
    }

    private async getOperations(getUserOperationsDto: GetUserOperationsDto) {
      const { userId } = getUserOperationsDto;
      const userFound = await this.findUser(userId);
      const userOperations = await this._operationRepository.get(userFound._id);
      return userOperations;
    }

    private async findUser(userId: string) {
      const userFound = await this._userRepository.getById(userId);

      if (!userFound) {
        throw new ValidationFailedError('fail to get operations', { name: 'user', message: 'non-existent user' });
      }

      return userFound;
    }
}
