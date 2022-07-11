import { Either, left, right } from '../../../shared/models/either';
import { User } from '../../../users/domain/entities/user';
import { OperationErrors } from '../../errors/operation.errors';
import { OperationType } from '../valueObjects/operation-type';

type OperationProps = {
  user: User,
  type: OperationType,
  value: number,
  date: Date,
  executed: boolean,
  category: string,
  description: string
}

type OperationData = {
  user: User,
  type: string,
  value: number,
  date?: string,
  executed?: boolean,
  category: string,
  description: string
}

export class Operation {
  public readonly id!: string;
  public user: User;
  public type: OperationType;
  public value: number;
  public date: Date;
  public executed: boolean;
  public category: string;
  public description: string;

  private constructor(operationProps: OperationProps, id?: string) {
    this.user = operationProps.user;
    this.type = operationProps.type;
    this.value = operationProps.value;
    this.date = operationProps.date;
    this.executed = operationProps.executed;
    this.category = operationProps.category;
    this.description = operationProps.description;
    if (id) this.id = id;
  }

  public static create(operationProps: OperationData, id?: string): Either<OperationErrors.InvalidOperationType, Operation> {
    const operationTypeOrError = OperationType.create(operationProps.type);

    if (operationTypeOrError.isLeft()) {
      return left(operationTypeOrError.value);
    }

    const defaultValues: OperationProps = {
      date: operationProps.date ? new Date(operationProps.date) : new Date(),
      type: operationTypeOrError.value,
      executed: operationProps.executed || false,
      category: operationProps.category,
      description: operationProps.description,
      user: operationProps.user,
      value: operationProps.value
    };

    return right(new Operation(defaultValues, id));
  }
}
