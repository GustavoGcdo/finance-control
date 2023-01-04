import { NextFunction, Request, Response } from 'express';
import { ValidationFailedError } from '../../application/errors/validationFailedError';
import { IAuthService } from '../../application/services/auth-service.interface';
import { HttpStatus } from '../helper/enums/http-status.enum';
import { HandleResponse } from '../helper/handleResponse';

export class AuthMiddleware {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  public async authorize(request: Request, response: Response, next: NextFunction) {
    const token = request.body.token || request.query.token || request.headers.authorization;

    if (!token) {
      const validationError = new ValidationFailedError('restricted access',
        { name: 'server', message: 'this route is restrict' });
      return HandleResponse.handleError(response, HttpStatus.UNAUTHORIZED, validationError);
    } else {
      return await this.authService.verifyToken(token)
        .then(() => next())
        .catch(() => {
          const validationError = new ValidationFailedError('unauthorized',
            { name: 'server', message: 'invalid token' });

          return HandleResponse.handleError(response, HttpStatus.UNAUTHORIZED, validationError);
        });
    }
  }
}
