import { Result } from '../../../infra/models/result';
import { UpdateOperationDto } from './update-operation.dto';

export interface IUpdateOperationHandler {
    handle(addOperationDto: UpdateOperationDto): Promise<Result<null>>;
}
