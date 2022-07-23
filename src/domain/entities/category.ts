import { EOperationType } from '../enums/operation-type.enum';

export interface Category {
  id: string;
  name: string;
  type: EOperationType;
}
