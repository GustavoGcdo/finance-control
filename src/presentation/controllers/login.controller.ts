import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { HttpStatus } from '../../infra/enums/http-status.enum';
import { HandleResponse } from '../../infra/helper/handleResponse';
import { ISignupHandler } from '../../modules/login/handlers/signup-handler.interface';
import LoginTypes from '../../modules/login/types/login.types';

@injectable()
export class LoginController {
    private _signupHandler: ISignupHandler;

    constructor(@inject(LoginTypes.SignupHandler) signupHandler: ISignupHandler) {
        this._signupHandler = signupHandler;
    }

    public async signup(request: Request, response: Response) {
        try {
            const result = await this._signupHandler.handle(request.body);
            return HandleResponse.handle(response, HttpStatus.CREATED, result);
        } catch (error) {
            return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
        }
    }
}
