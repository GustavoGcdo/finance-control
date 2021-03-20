import { Operation } from '../models/entities/operation';
export interface IOperationRepository {
    getById(id: string): Promise<Operation | null>;
    get(userId: string): Promise<Operation[]>;
    add(operation: Operation): Promise<Operation>;
    update(operation: Operation): Promise<void>;
}
