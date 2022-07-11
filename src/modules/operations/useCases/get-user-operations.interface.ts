import { Result } from '../../../infra/models/result';
import { GetUserOperationsDto } from '../dtos/get-user-operations.dto';
import { PaginateOperationsDto } from '../dtos/pagintate-operations.dto';

export interface IGetUserOperations {
    handle(getUserOperationsDto: GetUserOperationsDto): Promise<Result<PaginateOperationsDto>>;
}
