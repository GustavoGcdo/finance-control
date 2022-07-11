import { Result } from '../../../infra/models/result';
import { Operation } from '../domain/entities/operation';
import { AddOperationDto } from '../dtos/add-operation.dto';

export interface IAddOperation {
  handle(addOperationDto: AddOperationDto): Promise<Result<Operation>>;
}
