import { Report } from '../../@shared/report';
export class ValidationFailedError extends Error {
  public readonly reports: Report[];

  constructor(message: string, ...reports: Report[]) {
    super(message);
    this.reports = reports;
    Object.setPrototypeOf(this, ValidationFailedError.prototype);
  }

}
