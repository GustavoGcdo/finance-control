import { Operation } from '../../domain/entities/operation';
import { PaginateOptions, PaginateResult } from '../../domain/valueObjects/paginate-options';

export interface IOperationRepository {
  getById(id: string): Promise<Operation | null>;
  paginate(userId: string, paginateOptions: PaginateOptions): Promise<PaginateResult<Operation>>;
  get(userId: string): Promise<Operation[]>;
  update(operation: Operation): Promise<void>;
  add(operation: Operation): Promise<Operation | null>;
  remove(id: string): Promise<void>;
}
