import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { HttpStatus } from '../../infra/enums/http-status.enum';
import { HandleResponse } from '../../infra/helper/handleResponse';
import { IAddRecipeHandler } from '../../modules/finance/handlers/add-recipe-handler.interface';
import FinanceTypes from '../../modules/finance/types/finance.types';
import { AddExpenseHandler } from '../../modules/finance/handlers/add-expense.handler';
import { IAddExpenseHandler } from '../../modules/finance/handlers/add-expense-handler.interface';
import { IGetUserOperationsHandler } from '../../modules/finance/handlers/get-user-operations-handler.interface';
import SharedTypes from '../../modules/shared/types/shared.types';
import { IAuthService } from '../../modules/shared/services/auth-service.interface';

@injectable()
export class FinanceController {
    private _getUserOperations: IGetUserOperationsHandler;
    private _addRecipeHandler: IAddRecipeHandler;
    private _addExpenseHandler: IAddExpenseHandler;
    private _authService: IAuthService;

    constructor(
        @inject(FinanceTypes.GetUserOperationsHandler) getUserOperations: IGetUserOperationsHandler,
        @inject(FinanceTypes.AddRecipeHandler) addRecipeHandler: IAddRecipeHandler,
        @inject(FinanceTypes.AddExpenseHandler) addExpenseHandler: IAddExpenseHandler,
        @inject(SharedTypes.AuthService) authService: IAuthService
    ) {
        this._getUserOperations = getUserOperations;
        this._addRecipeHandler = addRecipeHandler;
        this._addExpenseHandler = addExpenseHandler;
        this._authService = authService;
    }

    public async getUserOperations(request: Request, response: Response) {
        try {
            const token = request.headers['authorization'];
            const data = await this._authService.verifyToken(token || '');
            const result = await this._getUserOperations.handle({ userId: data._id });
            return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
        } catch (error) {
            return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
        }
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
