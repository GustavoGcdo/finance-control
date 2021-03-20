import { Request, Response } from 'express';
import { IGetUserExtractHandler } from '../../modules/extract/handlers/get-user-extract-handler.interface';
import { AddOperationDto } from '../../modules/operations/dtos/add-operation.dto';
import { UpdateOperationDto } from '../../modules/operations/dtos/update-operation.dto';
import { IAddOperationHandler } from '../../modules/operations/handlers/add-operation-handler.interface';
import { IGetUserOperationsHandler } from '../../modules/operations/handlers/get-user-operations-handler.interface';
import { IUpdateOperationHandler } from '../../modules/operations/handlers/update-operation-handler.interface';
import { IAuthService } from '../../modules/shared/services/auth-service.interface';
import { HttpStatus } from '../helper/enums/http-status.enum';
import { HandleResponse } from '../helper/handleResponse';

export class FinanceController {
  private _getUserOperations: IGetUserOperationsHandler;
  private _getUserExtract: IGetUserExtractHandler;
  private _addOperationHandler: IAddOperationHandler;
  private _updateOperationHandler: IUpdateOperationHandler;
  private _authService: IAuthService;

  constructor(
    getUserOperations: IGetUserOperationsHandler,
    getUserExtract: IGetUserExtractHandler,
    addOperationHandler: IAddOperationHandler,
    updateOperationHandler: IUpdateOperationHandler,
    authService: IAuthService
  ) {
    this._getUserOperations = getUserOperations;
    this._getUserExtract = getUserExtract;
    this._addOperationHandler = addOperationHandler;
    this._updateOperationHandler = updateOperationHandler;
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

  public async updateOperation(request: Request, response: Response) {
    try {
      const token = request.headers.authorization;
      const data = await this._authService.verifyToken(token || '');

      const addOperationDto: UpdateOperationDto = {
        ...request.body,
        userId: data._id,
        operationId: request.params.id
      };

      const result = await this._updateOperationHandler.handle(addOperationDto);
      return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
    } catch (error) {
      return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
    }
  }
}
