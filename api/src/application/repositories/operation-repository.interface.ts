import { Operation } from '../../domain/entities/operation';
import { PaginateOptions, PaginateResult } from '../../domain/valueObjects/paginate-options';
import { FilterOperation } from '../../domain/valueObjects/filter';

export interface IOperationRepository {
  getById(id: string): Promise<Operation | null>;
  paginate(
    userId: string,
    paginateOptions: PaginateOptions,
    filter: FilterOperation
  ): Promise<PaginateResult<Operation>>;
  get(userId: string): Promise<Operation[]>;
  update(operation: Operation): Promise<void>;
  add(operation: Operation): Promise<Operation | null>;
  remove(id: string): Promise<void>;
}
