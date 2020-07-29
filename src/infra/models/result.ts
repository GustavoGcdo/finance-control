import { Report } from './report';
export class Result {
  data: any;
  message: string;
  success: boolean;
  errors: Report[];

  constructor(data: any, message: string, success: boolean, errors: Report[]) {
    this.data = data;
    this.message = message;
    this.success = success;
    this.errors = errors;
  }
}
