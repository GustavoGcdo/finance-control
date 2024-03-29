import { IOperationRepository } from '../../application/repositories/operation-repository.interface';
import { Operation } from '../../domain/entities/operation';
import { PaginateOptions, PaginateResult } from '../../domain/valueObjects/paginate-options';
import { OperationMap } from '../mappers/operation-map';
import OperationModel from '../schemas/operation.schema';
import { FilterOperation } from '../../domain/valueObjects/filter';

export class OperationRepository implements IOperationRepository {
  async getById(id: string): Promise<Operation | null> {
    const foundDocument = await OperationModel.findById(id);
    return foundDocument ? OperationMap.toDomain(foundDocument) : null;
  }

  async get(userId: string): Promise<Operation[]> {
    const documentsOperations = await OperationModel.find({ 'user._id': userId }).sort({
      createdAt: -1
    });
    const operations = documentsOperations.map((o: any) => OperationMap.toDomain(o)) as Operation[];
    return operations;
  }

  async paginate(
    userId: string,
    paginateOptions: PaginateOptions,
    filter: FilterOperation
  ): Promise<PaginateResult<Operation>> {
    const { skip = 0, limit = 10 } = paginateOptions;

    const query: Record<string, any> = { 'user._id': userId };

    if (filter.month) {
      const date = filter.month;
      
      const firstDay = new Date(date.getUTCFullYear(), date.getUTCMonth() , 1);
      const lastDay = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0);

      query.date = {
        $gte: firstDay,
        $lte: lastDay
      };
    }

    const count = await OperationModel.countDocuments(query);
    const documentsOperations = await OperationModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
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
    const operationToDb = OperationMap.toPersist(operation);
    await OperationModel.updateOne({ _id: operation.id }, operationToDb);
  }

  async remove(id: string): Promise<void> {
    await OperationModel.deleteOne({ _id: id });
  }
}
