import { Result } from '../../../@shared/result';
import { PaginateOptions } from '../../../domain/valueObjects/paginate-options';
import { GetUserOperationsContract } from '../../../infra/contracts/get-user-operations.contract';
import { ValidationFailedError } from '../../errors/validationFailedError';
import { IOperationRepository } from '../../repositories/operation-repository.interface';
import { IUserRepository } from '../../repositories/user-repository.interface';
import { GetUserOperationsDto } from './get-user-operations.dto';
import { IGetUserOperations } from './get-user-operations.interface';
import { PaginateOperationsDto } from './pagintate-operations.dto';
import { FilterOperation } from '../../../domain/valueObjects/filter';

export class GetUserOperations implements IGetUserOperations {
  private operationRepository: IOperationRepository;
  private userRepository: IUserRepository;

  constructor(operationRepository: IOperationRepository, userRepository: IUserRepository) {
    this.operationRepository = operationRepository;
    this.userRepository = userRepository;
  }

  async handle(getUserOperationsDto: GetUserOperationsDto): Promise<Result<PaginateOperationsDto>> {
    this.validateContract(getUserOperationsDto);
    const paginateResult = await this.getOperations(getUserOperationsDto);
    const resultSuccess = new Result(paginateResult, 'success on fetch user operations', true, []);
    return resultSuccess;
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
    const paginateOptions = this.getPaginateOptions(getUserOperationsDto);
    const filter = this.getFilter(getUserOperationsDto);
    const resultPaginate = await this.operationRepository.paginate(
      userFound.id,
      paginateOptions,
      filter
    );
    const operationsOutput = resultPaginate.results.map(({ type, ...rest }) => ({
      ...rest,
      type: type.value
    }));

    resultPaginate.results = operationsOutput as any[];

    return resultPaginate;
  }

  private getPaginateOptions(getUserOperationsDto: GetUserOperationsDto): PaginateOptions {
    const { page = '1', limit = '10' } = getUserOperationsDto;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const paginateOptions: PaginateOptions = {
      limit: parseInt(limit),
      skip
    };

    return paginateOptions;
  }

  private getFilter(getUserOperationsDto: GetUserOperationsDto): FilterOperation {
    const { monthOfTheYear } = getUserOperationsDto;
    const filter: FilterOperation = {};
    if (monthOfTheYear) {
      const [month, year] = monthOfTheYear?.split('-');
      filter.month = new Date(`${year}-${month}`);
    }

    return filter;
  }

  private async findUser(userId: string) {
    const userFound = await this.userRepository.getById(userId);

    if (!userFound) {
      throw new ValidationFailedError('fail to get operations', {
        name: 'user',
        message: 'non-existent user'
      });
    }

    return userFound;
  }
}
