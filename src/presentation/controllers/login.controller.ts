import { Request, Response } from 'express';
import { Login } from '../../modules/login/useCases/login';
import { Signup } from '../../modules/login/useCases/signup';
import { HttpStatus } from '../helper/enums/http-status.enum';
import { HandleResponse } from '../helper/handleResponse';

export class LoginController {
    private _signup: Signup;
    private _login: Login;

    constructor(
      signup: Signup,
      login: Login
    ) {
      this._signup = signup;
      this._login = login;
    }

    public async signup(request: Request, response: Response) {
      try {
        const result = await this._signup.handle(request.body);
        return HandleResponse.handle(response, HttpStatus.CREATED, result);
      } catch (error) {
        return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
      }
    }

    public async login(request: Request, response: Response) {
      try {
        const result = await this._login.handle(request.body);
        return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
      } catch (error) {
        return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
      }
    }
}
