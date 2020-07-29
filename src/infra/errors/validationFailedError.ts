import { Report } from '../models/report';
export class ValidationFailedError extends Error {
  private _reports: Report[];

  constructor(message: string, ...reports: Report[]) {
    super(message);
    this._reports = reports;
    Object.setPrototypeOf(this, ValidationFailedError.prototype);
  }

  public get reports(): Report[] {
    return this._reports;
  }
}
