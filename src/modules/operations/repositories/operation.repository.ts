import { injectable } from 'inversify';
import { Operation } from '../models/entities/operation';
import OperationModel from '../schemas/operation.schema';
import { IOperationRepository } from './operation-repository.interface';

@injectable()
export class OperationRepository implements IOperationRepository {
  async get(userId: string): Promise<Operation[]> {
    const documentsOperations = await OperationModel.find({ 'user._id': userId }).sort({ createdAt: -1 });
    const operations = documentsOperations.map(o => o.toObject()) as Operation[];
    return operations;
  }

  async add(operation: Operation): Promise<Operation> {
    const documentCreated = await OperationModel.create(operation);
    const operationCreated = documentCreated.toObject() as Operation;
    return operationCreated;
  }
}
