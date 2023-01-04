import { Result } from '../../../@shared/result';
import { Operation } from '../../../domain/entities/operation';
import { EOperationType } from '../../../domain/enums/operation-type.enum';
import { GetUserExtractContract } from '../../../infra/contracts/get-user-extract.contract';
import { ValidationFailedError } from '../../errors/validationFailedError';
import { IOperationRepository } from '../../repositories/operation-repository.interface';
import { IUserRepository } from '../../repositories/user-repository.interface';
import { GetUserExtract } from './get-user-extract';
import { GetUserExtractDto } from './get-user-extract.dto';
import { UserExtractDto } from './user-extract.dto';

export class GetSimpleUserExtract implements GetUserExtract {
    private operationRepository: IOperationRepository;
    private userRepository: IUserRepository;

    constructor(
      operationRepository: IOperationRepository,
      userRepository: IUserRepository
    ) {
      this.operationRepository = operationRepository;
      this.userRepository = userRepository;
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
      const userOperations = await this.operationRepository.get(userFound.id);

      const totalRecipes = this.sumExecutedOperationsByType(userOperations, EOperationType.RECIPE);
      const totalExpenses = this.sumExecutedOperationsByType(userOperations, EOperationType.EXPENSE);

      const userExtract: UserExtractDto =
        {
          name: userFound.name,
          email: userFound.email.value,
          balance: totalRecipes - totalExpenses,
          totalRecipes,
          totalExpenses: totalExpenses
        };

      return userExtract;
    }

    private async findUser(userId: string) {
      const userFound = await this.userRepository.getById(userId);

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
