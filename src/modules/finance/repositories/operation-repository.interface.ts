import { Operation } from '../models/entities/operation';
export interface IOperationRepository {
    add(operation: Operation): Promise<Operation>;
}