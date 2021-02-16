import { Request, Response } from 'express';
import { ILoginHandler } from '../../modules/login/handlers/login-handler.interface';
import { ISignupHandler } from '../../modules/login/handlers/signup-handler.interface';
import { HttpStatus } from '../helper/enums/http-status.enum';
import { HandleResponse } from '../helper/handleResponse';

export class LoginController {
    private _signupHandler: ISignupHandler;
    private _loginHandler: ILoginHandler;

    constructor(
      signupHandler: ISignupHandler,
      loginHandler: ILoginHandler
    ) {
      this._signupHandler = signupHandler;
      this._loginHandler = loginHandler;
    }

    public async signup(request: Request, response: Response) {
      try {
        const result = await this._signupHandler.handle(request.body);
        return HandleResponse.handle(response, HttpStatus.CREATED, result);
      } catch (error) {
        return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
      }
    }

    public async login(request: Request, response: Response) {
      try {
        const result = await this._loginHandler.handle(request.body);
        return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
      } catch (error) {
        return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
      }
    }
}
