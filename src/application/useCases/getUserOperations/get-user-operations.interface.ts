import { Result } from '../../../infra/models/result';
import { GetUserOperationsDto } from './get-user-operations.dto';
import { PaginateOperationsDto } from './pagintate-operations.dto';

export interface IGetUserOperations {
    handle(getUserOperationsDto: GetUserOperationsDto): Promise<Result<PaginateOperationsDto>>;
}
