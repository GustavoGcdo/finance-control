import { OperationType } from '../enums/operation-type.enum';
import { UserOperation } from './user-operation';

export interface Operation {
    _id: string;
    user: UserOperation;
    type: OperationType;
    value: number;
    date: Date;
}