import { Result } from '../../../infra/models/result';
import { AddExpenseDto } from '../dtos/add-expense.dto';

export interface IAddExpenseHandler {
    handle(addExpenseDto: AddExpenseDto): Promise<Result>;
}