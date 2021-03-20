import { Result } from '../../../infra/models/result';
import { UpdateOperationDto } from '../dtos/update-operation.dto';

export interface IUpdateOperationHandler {
    handle(addOperationDto: UpdateOperationDto): Promise<Result<null>>;
}
