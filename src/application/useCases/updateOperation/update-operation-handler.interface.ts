import { Result } from '../../../@shared/result';
import { UpdateOperationDto } from './update-operation.dto';

export interface IUpdateOperationHandler {
    handle(addOperationDto: UpdateOperationDto): Promise<Result<null>>;
}
