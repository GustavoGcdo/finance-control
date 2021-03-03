import { ValidationFailedError } from '../../../infra/errors/validationFailedError';
import { Result } from '../../../infra/models/result';
import { Operation } from '../../operations/domain/entities/operation';
import { EOperationType } from '../../operations/domain/enums/operation-type.enum';
import { IOperationRepository } from '../../operations/repositories/operation-repository.interface';
import { IUserRepository } from '../../users/repositories/user-repository.interface';
import { GetUserExtractContract } from '../contracts/get-user-extract.contract';
import { GetUserExtractDto } from '../dtos/get-user-extract.dto';
import { UserExtractDto } from '../dtos/user-extract.dto';
import { GetUserExtract } from './get-user-extract';

export class GetSimpleUserExtract implements GetUserExtract {
    private _operationRepository: IOperationRepository;
    private _userRepository: IUserRepository;

    constructor(
      operationRepository: IOperationRepository,
      userRepository: IUserRepository
    ) {
      this._operationRepository = operationRepository;
      this._userRepository = userRepository;
    }

    async handle(getUserExtractDto: GetUserExtractDto): Promise<Result<UserExtractDto>> {
      this.validate(getUserExtractDto);
      const userExtract = await this.getUserExtract(getUserExtractDto);
      const resultSuccess = new Result(userExtract, 'successful search for user statement', true, []);
      return resultSuccess;
    }

    private validate(getUserExtractDto: GetUserExtractDto) {
      const contract = new GetUserExtractContract(getUserExtractDto);
      const isInvalid = !contract.validate();

      if (isInvalid) {
        throw new ValidationFailedError('failed to get user statement', ...contract.reports);
      }
    }

    private async getUserExtract(getUserExtractDto: GetUserExtractDto) {
      const { userId } = getUserExtractDto;
      const userFound = await this.findUser(userId);
      const userOperations = await this._operationRepository.get(userFound._id);

      const totalRecipes = this.sumExecutedOperationsByType(userOperations, EOperationType.RECIPE);
      const totalExpenses = this.sumExecutedOperationsByType(userOperations, EOperationType.EXPENSE);

      const userExtract: UserExtractDto =
        {
          name: userFound.name,
          email: userFound.email.value,
          balance: userFound.balance || 0,
          totalRecipes,
          totalExpenses: totalExpenses
        };

      return userExtract;
    }

    private async findUser(userId: string) {
      const userFound = await this._userRepository.getById(userId);

      if (!userFound) {
        throw new ValidationFailedError('failed to get user statement',
          { name: 'user', message: 'non-existent user' });
      }

      return userFound;
    }

    private sumExecutedOperationsByType(operations: Operation[], type: EOperationType): number {
      return operations
        .filter(operation => operation.type.value === type && operation.executed)
        .map(o => o.value)
        .reduce((acum, item) => item + acum, 0);
    }
}
