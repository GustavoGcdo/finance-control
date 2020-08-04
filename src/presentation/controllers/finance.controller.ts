import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { HttpStatus } from '../../infra/enums/http-status.enum';
import { HandleResponse } from '../../infra/helper/handleResponse';
import { IAddRecipeHandler } from '../../modules/finance/handlers/add-recipe-handler.interface';
import FinanceTypes from '../../modules/finance/types/finance.types';
import { AddExpenseHandler } from '../../modules/finance/handlers/add-expense.handler';
import { IAddExpenseHandler } from '../../modules/finance/handlers/add-expense-handler.interface';

@injectable()
export class FinanceController {
    private _addRecipeHandler: IAddRecipeHandler;
    private _addExpenseHandler: IAddExpenseHandler;

    constructor(
        @inject(FinanceTypes.AddRecipeHandler) addRecipeHandler: IAddRecipeHandler,
        @inject(FinanceTypes.AddExpenseHandler) addExpenseHandler: IAddExpenseHandler
        ) {
        this._addRecipeHandler = addRecipeHandler;
        this._addExpenseHandler = addExpenseHandler;
    }

    public async addRecipe(request: Request, response: Response) {
        try {
            const result = await this._addRecipeHandler.handle(request.body);
            return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
        } catch (error) {
            return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
        }
    }
    
    public async addExpense(request: Request, response: Response) {
        try {
            const result = await this._addExpenseHandler.handle(request.body);
            return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
        } catch (error) {
            return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
        }
    }
}
