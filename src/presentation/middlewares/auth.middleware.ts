import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../infra/enums/http-status.enum';
import { ValidationFailedError } from '../../infra/errors/validationFailedError';
import { HandleResponse } from '../../infra/helper/handleResponse';
import { IAuthService } from '../../modules/shared/services/auth-service.interface';

export class AuthMiddleware {
    private _authService: IAuthService;

    constructor(authService: IAuthService) {
      this._authService = authService;
    }

    public async authorize(request: Request, response: Response, next: NextFunction) {
      const token = request.body.token || request.query.token || request.headers.authorization;

      if (!token) {
        const validationError = new ValidationFailedError('restricted access',
          { name: 'server', message: 'this route is restrict' });
        return HandleResponse.handleError(response, HttpStatus.UNAUTHORIZED, validationError);
      } else {
        return await this._authService.verifyToken(token)
          .then(() => next())
          .catch(() => {
            const validationError = new ValidationFailedError('unauthorized',
              { name: 'server', message: 'invalid token' });

            return HandleResponse.handleError(response, HttpStatus.UNAUTHORIZED, validationError);
          });
      }
    }
}
