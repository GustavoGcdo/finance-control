import { Response } from 'express';
import { Result } from '../../@shared/result';
import { ValidationFailedError } from '../../application/errors/validationFailedError';
import { HttpStatus } from './enums/http-status.enum';

export abstract class HandleResponse {
  public static handle(response: Response, status: HttpStatus, result: Result<any>) {
    return response.status(status).send(result);
  }

  public static handleError(response: Response, status: HttpStatus, error: Error) {
    if (error instanceof ValidationFailedError) {
      return response.status(status).send(new Result(null, error.message, false, error.reports));
    }
    return response
      .status(HttpStatus.INTERNAL_ERROR)
      .send(
        new Result(null, error.message, false, [
          { name: 'server', message: 'internal server error' }
        ])
      );
  }
}
