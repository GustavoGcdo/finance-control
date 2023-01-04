import { Request, Response } from 'express';
import { ILogin } from '../../application/useCases/login/login.interface';
import { ISignup } from '../../application/useCases/signup/signup.interface';
import { HttpStatus } from '../helper/enums/http-status.enum';
import { HandleResponse } from '../helper/handleResponse';

export class LoginController {
    private signupUseCase: ISignup;
    private loginUseCase: ILogin;

    constructor(
      signup: ISignup,
      login: ILogin
    ) {
      this.signupUseCase = signup;
      this.loginUseCase = login;
    }

    public async signup(request: Request, response: Response) {
      try {
        const result = await this.signupUseCase.handle(request.body);
        return HandleResponse.handle(response, HttpStatus.CREATED, result);
      } catch (error) {
        return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
      }
    }

    public async login(request: Request, response: Response) {
      try {
        const result = await this.loginUseCase.handle(request.body);
        return HandleResponse.handle(response, HttpStatus.SUCCESS, result);
      } catch (error) {
        return HandleResponse.handleError(response, HttpStatus.BAD_REQUEST, error);
      }
    }
}
