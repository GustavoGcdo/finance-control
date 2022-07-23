import { Request, Response } from 'express';
import { IAuthService } from '../../application/services/auth-service.interface';
import { AddOperationDto } from '../../application/useCases/addOperation/add-operation.dto';
import { IAddOperation } from '../../application/useCases/addOperation/add-operation.interface';
import { GetUserExtract } from '../../application/useCases/getUserExtract/get-user-extract';
import { IGetUserOperations } from '../../application/useCases/getUserOperations/get-user-operations.interface';
import { IUpdateOperationHandler } from '../../application/useCases/updateOperation/update-operation-handler.interface';
import { UpdateOperationDto } from '../../application/useCases/updateOperation/update-operation.dto';
import { HttpStatus } from '../helper/enums/http-status.enum';
import { HandleResponse } from '../helper/handleResponse';

export class FinanceController {
  private _updateOperationHandler: IUpdateOperationHandler;
  private _getUserOperations: IGetUserOperations;
  private _getUserExtract: GetUserExtract;
  private _addOperation: IAddOperation;
  private _authService: IAuthService;

  constructor(
    getUserOperations: IGetUserOperations,
    getUserExtract: GetUserExtract,
    addOperation: IAddOperation,
    updateOperationHandler: IUpdateOperationHandler,
    authService: IAuthService
  ) {
    this._getUserOperations = getUserOperations;
    this._getUserExtract = getUserExtract;
    this._updateOperationHandler = updateOperationHandler;
    this._addOperation = addOperation;
    this._authService = authService;

  }

  public async getUserOperations(request: Request, response: Response) {
    try {
      const token = request.headers.authorization;
      const data = await this._authService.verifyToken(token || '');
      const { page, limit } = request.query;
      const result = await this._getUserOperations.handle({
        userId: data._id,
        page: page?.toString(),
        limit: limit?.toString()
      });
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
      const result = await this._addOperation.handle(addOperationDto);
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
