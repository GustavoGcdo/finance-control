import { Request, Response } from 'express';
import { IInfoService } from '../../info/services/info-service.interface';
import { HttpStatus } from '../helper/enums/http-status.enum';
import { HandleResponse } from '../helper/handleResponse';
import { Result } from '../models/result';

export class InfoController {
  private _infoService: IInfoService;

  constructor(infoService: IInfoService) {
    this._infoService = infoService;
  }

  public getApiInfo(request: Request, response: Response) {
    const infoApi = this._infoService.getInfo();
    const result = new Result(infoApi, 'success on get info API', true, []);
    return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
  }
}
