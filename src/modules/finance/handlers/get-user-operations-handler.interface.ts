import { Result } from '../../../infra/models/result';
import { GetUserOperationsDto } from '../dtos/get-user-operations.dto';

export interface IGetUserOperationsHandler {
    handle(getUserOperationsDto: GetUserOperationsDto): Promise<Result>;
}
