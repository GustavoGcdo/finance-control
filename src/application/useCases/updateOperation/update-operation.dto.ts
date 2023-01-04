export interface UpdateOperationDto {
  userId: string;
  operationId: string;
  type?: string;
  value?: number;
  executed?: boolean;
  description?: string;
  category?: string;
  date?: string;
}
