import { PaginateOptions, PaginateResult } from '../../shared/types/paginate-options';
import { Operation } from '../models/entities/operation';
export interface IOperationRepository {
    getById(id: string): Promise<Operation | null>;
    paginate(userId: string, paginateOptions: PaginateOptions): Promise<PaginateResult<Operation>>;
    get(userId: string): Promise<Operation[]>;
    add(operation: Operation): Promise<Operation>;
    update(operation: Operation): Promise<void>;
}
