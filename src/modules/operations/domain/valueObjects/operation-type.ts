import { Either, left, right } from '../../../shared/models/either';
import { OperationErrors } from '../../errors/operation.errors';
import { EOperationType } from '../enums/operation-type.enum';

export class OperationType {
  public readonly value: EOperationType;

  private constructor(type: EOperationType) {
    this.value = type;
  }

  public static create(type: string) : Either<OperationErrors.InvalidOperationType, OperationType> {
    if (EOperationType.EXPENSE === type || EOperationType.RECIPE === type) {
      return right(new OperationType(type));
    }

    return left(new OperationErrors.InvalidOperationType('invalid operation type'));
  }
}
