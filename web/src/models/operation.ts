import { OperationType } from './enums/operation-type.enum';
import { UserOperation } from './user-operation';

export interface Operation {
    id: string;
    user: UserOperation;
    type: OperationType;
    value: number;
    date: string;
    executed: boolean;
    category: string;
    description: string;    
}