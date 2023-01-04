import { Request, Response } from 'express';

import { Result } from '../../@shared/result';
import { HttpStatus } from '../helper/enums/http-status.enum';
import { HandleResponse } from '../helper/handleResponse';
import { InfoService } from '../services/info.service';

export class InfoController {
  private infoService: InfoService;

  constructor(infoService: InfoService) {
    this.infoService = infoService;
  }

  public getApiInfo(request: Request, response: Response) {
    const infoApi = this.infoService.getInfo();
    const result = new Result(infoApi, 'success on get info API', true, []);
    return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
  }
}
