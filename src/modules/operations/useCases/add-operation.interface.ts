import { Result } from '../../../infra/models/result';
import { AddOperationDto } from '../dtos/add-operation.dto';

export interface IAddOperation {
    handle(addOperationDto: AddOperationDto): Promise<Result<null>>;
}
