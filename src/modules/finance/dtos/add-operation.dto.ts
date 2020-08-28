export interface AddOperationDto {
  userId: string;
  type: string;
  value: number;
  executed: boolean;
  description: string;
  category: string;
  date: string;
}
