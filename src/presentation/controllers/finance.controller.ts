import { Request, Response } from 'express';
import { GetUserExtract } from '../../modules/extract/useCases/get-user-extract';
import { AddOperationDto } from '../../modules/operations/dtos/add-operation.dto';
import { IAddOperation } from '../../modules/operations/useCases/add-operation.interface';
import { IGetUserOperations } from '../../modules/operations/useCases/get-user-operations.interface';
import { IAuthService } from '../../modules/shared/services/auth-service.interface';
import { HttpStatus } from '../helper/enums/http-status.enum';
import { HandleResponse } from '../helper/handleResponse';

export class FinanceController {
  private _getUserOperations: IGetUserOperations;
  private _getUserExtract: GetUserExtract;
  private _addOperation: IAddOperation;
  private _authService: IAuthService;

  constructor(
    getUserOperations: IGetUserOperations,
    getUserExtract: GetUserExtract,
    addOperation: IAddOperation,
    authService: IAuthService
  ) {
    this._getUserOperations = getUserOperations;
    this._getUserExtract = getUserExtract;
    this._addOperation = addOperation;
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
      const result = await this._addOperation.handle(addOperationDto);
      return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
    } catch (error) {
      return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
    }
  }
}
