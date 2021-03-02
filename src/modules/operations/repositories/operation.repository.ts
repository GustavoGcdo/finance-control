import { Operation } from '../domain/entities/operation';
import { OperationMap } from '../mappers/operation-map';
import OperationModel from '../schemas/operation.schema';
import { IOperationRepository } from './operation-repository.interface';

export class OperationRepository implements IOperationRepository {
  async get(userId: string): Promise<Operation[]> {
    const documentsOperations = await OperationModel.find({ 'user._id': userId }).sort({ createdAt: -1 });
    const operations = documentsOperations.map(o => OperationMap.toDomain(o)) as Operation[];
    return operations;
  }

  async add(operation: Operation): Promise<Operation | null> {
    const newOperation = OperationMap.toPersist(operation);
    const operationCreated = await OperationModel.create(newOperation);
    return operationCreated ? OperationMap.toDomain(operationCreated) : null;
  }
}
