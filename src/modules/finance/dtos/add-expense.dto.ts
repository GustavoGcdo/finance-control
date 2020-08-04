export interface AddExpenseDto {
    userId: string;
    value: number;
    paid?: boolean;
}