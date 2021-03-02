import { Operation } from '../domain/entities/operation';
export interface IOperationRepository {
    get(userId: string): Promise<Operation[]>;
    add(operation: Operation): Promise<Operation | null>;
}
