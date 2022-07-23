import { EOperationType } from '../enums/operation-type.enum';

export interface Category {
  _id: string;
  name: string;
  type: EOperationType;
}
