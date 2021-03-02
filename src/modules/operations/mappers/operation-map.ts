import { Operation } from '../domain/entities/operation';
export class OperationMap {
  public static toPersist(operation: Operation): any {
    return {
      ...operation,
      user: {
        _id: operation.user._id,
        name: operation.user.name,
        email: operation.user.email.value
      },
      type: operation.type.value
    };
  }

  public static toDomain(rawOperation: any): Operation {
    const operationOrError = Operation.create({
      category: rawOperation.category,
      description: rawOperation.description,
      value: rawOperation.value,
      date: rawOperation.date,
      executed: rawOperation.executed,
      type: rawOperation.type,
      user: rawOperation.user

    }, rawOperation._id);

    if (operationOrError.isLeft()) {
      throw Error('fail to map operation to domain');
    }

    return operationOrError.value;
  }
}
