import { Operation } from '../../../domain/entities/operation';
import { Result } from '../../../infra/models/result';
import { AddOperationDto } from './add-operation.dto';

export interface IAddOperation {
  handle(addOperationDto: AddOperationDto): Promise<Result<Operation>>;
}
