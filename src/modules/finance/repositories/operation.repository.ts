import { Operation } from '../models/entities/operation';
import { IOperationRepository } from './operation-repository.interface';
import OperationModel from '../schemas/operation.schema';
import { injectable } from 'inversify';

@injectable()
export class OperationRepository implements IOperationRepository {

    async get(userId: string): Promise<Operation[]> {
        const documentsOperations = await OperationModel.find({ 'user._id': userId }).sort({createdAt: -1});
        const operations = documentsOperations.map(o => o.toObject());
        return operations;
    }

    async add(operation: Operation): Promise<Operation> {
        const documentCreated = await OperationModel.create(operation);
        const operationCreated = documentCreated.toObject();
        return operationCreated;
    }
}