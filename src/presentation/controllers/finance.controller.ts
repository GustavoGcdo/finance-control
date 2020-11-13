import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { HttpStatus } from '../../infra/enums/http-status.enum';
import { HandleResponse } from '../../infra/helper/handleResponse';
import { IAddOperationHandler } from '../../modules/finance/handlers/add-operation-handler.interface';
import { IGetUserOperationsHandler } from '../../modules/finance/handlers/get-user-operations-handler.interface';
import FinanceTypes from '../../modules/finance/types/finance.types';
import { IAuthService } from '../../modules/shared/services/auth-service.interface';
import SharedTypes from '../../modules/shared/types/shared.types';
import { IGetUserExtractHandler } from '../../modules/finance/handlers/get-user-extract-handler.interface';
import { AddOperationDto } from '../../modules/finance/dtos/add-operation.dto';

@injectable()
export class FinanceController {
    private _getUserOperations: IGetUserOperationsHandler;
    private _getUserExtract: IGetUserExtractHandler;
    private _addOperationHandler: IAddOperationHandler;
    private _authService: IAuthService;

    constructor(
        @inject(FinanceTypes.GetUserOperationsHandler) getUserOperations: IGetUserOperationsHandler,
        @inject(FinanceTypes.GetUserExtractHandler) getUserExtract: IGetUserExtractHandler,
        @inject(FinanceTypes.AddOperationHandler) addOperationHandler: IAddOperationHandler,
        @inject(SharedTypes.AuthService) authService: IAuthService
    ) {
      this._getUserOperations = getUserOperations;
      this._getUserExtract = getUserExtract;
      this._addOperationHandler = addOperationHandler;
      this._authService = authService;
    }

    public async getUserOperations(request: Request, response: Response) {
      try {
        const token = request.headers.authorization;
        const data = await this._authService.verifyToken(token || '');
        const result = await this._getUserOperations.handle({ userId: data._id });
        return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
      } catch (error) {
        return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
      }
    }

    public async getUserExtract(request: Request, response: Response) {
      try {
        const token = request.headers.authorization;
        const data = await this._authService.verifyToken(token || '');
        const result = await this._getUserExtract.handle({ userId: data._id });
        return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
      } catch (error) {
        return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
      }
    }

    public async addOperation(request: Request, response: Response) {
      try {
        const token = request.headers.authorization;
        const data = await this._authService.verifyToken(token || '');
        const addOperationDto: AddOperationDto = {
          ...request.body,
          userId: data._id
        };
        const result = await this._addOperationHandler.handle(addOperationDto);
        return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
      } catch (error) {
        return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
      }
    }
}
