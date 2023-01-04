import { Result } from '../../../@shared/result';
import { Operation } from '../../../domain/entities/operation';
import { AddOperationDto } from './add-operation.dto';

export interface IAddOperation {
  handle(addOperationDto: AddOperationDto): Promise<Result<Operation>>;
}
