import { PaginateOptions, PaginateResult } from '../../shared/types/paginate-options';
import { Operation } from '../models/entities/operation';
import OperationModel from '../schemas/operation.schema';
import { IOperationRepository } from './operation-repository.interface';

export class OperationRepository implements IOperationRepository {
  async getById(id: string): Promise<Operation | null> {
    const foundDocument = await OperationModel.findById(id);
    return foundDocument ? foundDocument.toObject() as Operation : null;
  }

  async get(userId: string): Promise<Operation[]> {
    const documentsOperations = await OperationModel.find({ 'user._id': userId }).sort({ createdAt: -1 });
    const operations = documentsOperations.map(o => o.toObject()) as Operation[];
    return operations;
  }

  async paginate(userId: string, paginateOptions: PaginateOptions): Promise<PaginateResult<Operation>> {
    const { skip = 0, limit = 10 } = paginateOptions;

    const query = { 'user._id': userId };

    const count = await OperationModel.countDocuments(query);
    const documentsOperations = await OperationModel.find(query)
      .skip(skip).limit(limit).sort({ createdAt: -1 });

    const operations = documentsOperations.map(o => o.toObject()) as Operation[];

    const paginateResult: PaginateResult<Operation> = {
      results: operations,
      total: count
    };

    return paginateResult;
  }

  async add(operation: Operation): Promise<Operation> {
    const documentCreated = await OperationModel.create(operation);
    const operationCreated = documentCreated.toObject() as Operation;
    return operationCreated;
  }

  async update(operation: Operation): Promise<void> {
    await OperationModel.updateOne({ _id: operation._id }, operation);
  }
}
