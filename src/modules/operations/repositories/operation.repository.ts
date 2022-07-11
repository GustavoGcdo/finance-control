import { PaginateOptions, PaginateResult } from '../../shared/types/paginate-options';
import { Operation } from '../domain/entities/operation';
import { OperationMap } from '../mappers/operation-map';
import OperationModel from '../schemas/operation.schema';
import { IOperationRepository } from './operation-repository.interface';

export class OperationRepository implements IOperationRepository {
  async getById(id: string): Promise<Operation | null> {
    const foundDocument = await OperationModel.findById(id);
    return foundDocument ? OperationMap.toDomain(foundDocument) : null;
  }

  async get(userId: string): Promise<Operation[]> {
    const documentsOperations = await OperationModel.find({ 'user._id': userId }).sort({ createdAt: -1 });
    const operations = documentsOperations.map((o: any) => OperationMap.toDomain(o)) as Operation[];
    return operations;
  }

  async paginate(userId: string, paginateOptions: PaginateOptions): Promise<PaginateResult<Operation>> {
    const { skip = 0, limit = 10 } = paginateOptions;

    const query = { 'user._id': userId };

    const count = await OperationModel.countDocuments(query);
    const documentsOperations = await OperationModel.find(query)
      .skip(skip).limit(limit).sort({ createdAt: -1 });

    const operations = documentsOperations.map((o: any) => OperationMap.toDomain(o));

    const paginateResult: PaginateResult<Operation> = {
      results: operations,
      total: count
    };

    return paginateResult;
  }

  async add(operation: Operation): Promise<Operation | null> {
    const newOperation = OperationMap.toPersist(operation);
    const operationCreated = await OperationModel.create(newOperation);
    return operationCreated ? OperationMap.toDomain(operationCreated) : null;
  }

  async update(operation: Operation): Promise<void> {
    await OperationModel.updateOne({ _id: operation.id }, OperationMap.toPersist(operation));
  }
}
