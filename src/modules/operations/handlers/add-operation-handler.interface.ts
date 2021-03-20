import { Result } from '../../../infra/models/result';
import { AddOperationDto } from '../dtos/add-operation.dto';
import { Operation } from '../models/entities/operation';

export interface IAddOperationHandler {
    handle(addOperationDto: AddOperationDto): Promise<Result<Operation>>;
}
