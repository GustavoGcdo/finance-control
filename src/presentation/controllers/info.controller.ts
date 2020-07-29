import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { HttpStatus } from '../../infra/enums/http-status.enum';
import { HandleResponse } from '../../infra/helper/handleResponse';
import { Result } from '../../infra/models/result';
import InfoTypes from '../../modules/info/types/info.types';
import { IInfoService } from '../../modules/info/services/info-service.interface';

@injectable()
export class InfoController {
  private _infoService: IInfoService;

  constructor(@inject(InfoTypes.InfoService) infoService: IInfoService) {
    this._infoService = infoService;
  }

  public getApiInfo(request: Request, response: Response) {
    const infoApi = this._infoService.getInfo();
    const result = new Result(infoApi, 'success on get info API', true, []);
    return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
  }
}
