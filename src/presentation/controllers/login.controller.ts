import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { HttpStatus } from '../../infra/enums/http-status.enum';
import { HandleResponse } from '../../infra/helper/handleResponse';
import { ISignupHandler } from '../../modules/login/handlers/signup-handler.interface';
import LoginTypes from '../../modules/login/types/login.types';
import { ILoginHandler } from '../../modules/login/handlers/login-handler.interface';

@injectable()
export class LoginController {
    private _signupHandler: ISignupHandler;
    private _loginHandler: ILoginHandler;

    constructor(
        @inject(LoginTypes.SignupHandler) signupHandler: ISignupHandler,
        @inject(LoginTypes.LoginHandler) loginHandler: ILoginHandler
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
