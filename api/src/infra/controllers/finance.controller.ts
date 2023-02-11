import { Request, Response } from 'express';
import { IAuthService } from '../../application/services/auth-service.interface';
import { AddOperationDto } from '../../application/useCases/addOperation/add-operation.dto';
import { IAddOperation } from '../../application/useCases/addOperation/add-operation.interface';
import { DeleteOperation } from '../../application/useCases/deleteOperation/delete-operation';
import { GetUserExtract } from '../../application/useCases/getUserExtract/get-user-extract';
import { IGetUserOperations } from '../../application/useCases/getUserOperations/get-user-operations.interface';
import { IUpdateOperationHandler } from '../../application/useCases/updateOperation/update-operation-handler.interface';
import { UpdateOperationDto } from '../../application/useCases/updateOperation/update-operation.dto';
import { HttpStatus } from '../helper/enums/http-status.enum';
import { HandleResponse } from '../helper/handleResponse';

export class FinanceController {
  private updateOperationHandler: IUpdateOperationHandler;
  private getUserOperationsUseCase: IGetUserOperations;
  private getUserExtractUseCase: GetUserExtract;
  private addOperationUseCase: IAddOperation;
  private authServiceUseCase: IAuthService;
  private deleteOperationUseCase: DeleteOperation;

  constructor(
    getUserOperations: IGetUserOperations,
    getUserExtract: GetUserExtract,
    addOperation: IAddOperation,
    updateOperationHandler: IUpdateOperationHandler,
    authService: IAuthService,
    deleteOperationUseCase: DeleteOperation
  ) {
    this.getUserOperationsUseCase = getUserOperations;
    this.getUserExtractUseCase = getUserExtract;
    this.updateOperationHandler = updateOperationHandler;
    this.addOperationUseCase = addOperation;
    this.authServiceUseCase = authService;
    this.deleteOperationUseCase = deleteOperationUseCase;
  }

  public async getUserOperations(request: Request, response: Response) {
    try {
      const token = request.headers.authorization;
      const data = await this.authServiceUseCase.verifyToken(token || '');
      const { page, limit, monthOfTheYear } = request.query;
      const result = await this.getUserOperationsUseCase.handle({
        userId: data.id,
        page: page?.toString(),
        limit: limit?.toString(),
        monthOfTheYear: monthOfTheYear?.toString()
      });
      return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
    } catch (error) {
      return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
    }
  }

  public async getUserExtract(request: Request, response: Response) {
    try {
      const token = request.headers.authorization;
      const data = await this.authServiceUseCase.verifyToken(token || '');
      const result = await this.getUserExtractUseCase.handle({ userId: data.id });
      return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
    } catch (error) {
      return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
    }
  }

  public async addOperation(request: Request, response: Response) {
    try {
      const token = request.headers.authorization;
      const data = await this.authServiceUseCase.verifyToken(token || '');
      const addOperationDto: AddOperationDto = {
        ...request.body,
        userId: data.id
      };
      const result = await this.addOperationUseCase.handle(addOperationDto);
      return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
    } catch (error) {
      return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
    }
  }

  public async updateOperation(request: Request, response: Response) {
    try {
      const token = request.headers.authorization;
      const data = await this.authServiceUseCase.verifyToken(token || '');

      const addOperationDto: UpdateOperationDto = {
        ...request.body,
        userId: data.id,
        operationId: request.params.id
      };

      const result = await this.updateOperationHandler.handle(addOperationDto);
      return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
    } catch (error) {
      return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
    }
  }

  public async deleteOperation(request: Request, response: Response) {
    try {
      const result = await this.deleteOperationUseCase.handle(request.params.id);
      return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
    } catch (error) {
      return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
    }
  }
}
