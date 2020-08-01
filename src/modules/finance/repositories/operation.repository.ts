import { Operation } from '../models/entities/operation';
import { IOperationRepository } from './operation-repository.interface';
import OperationModel from '../schemas/operation.schema';
import { injectable } from 'inversify';

@injectable()
export class OperationRepository implements IOperationRepository {

    async add(operation: Operation): Promise<Operation> {
        const documentCreated = await OperationModel.create(operation);
        const operationCreated = documentCreated.toObject();
        return operationCreated;
    }
}