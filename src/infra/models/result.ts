import { Report } from './report';
export class Result<T> {
  data: T;
  message: string;
  success: boolean;
  errors: Report[];

  constructor(data: T, message: string, success: boolean, errors: Report[]) {
    this.data = data;
    this.message = message;
    this.success = success;
    this.errors = errors;
  }
}
