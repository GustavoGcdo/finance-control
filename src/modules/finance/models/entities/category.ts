import { OperationType } from '../enums/operation-type.enum';
export interface Category {
  _id: string;
  name: string;
  type: OperationType;
}
