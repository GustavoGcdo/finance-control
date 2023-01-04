import { Report } from './report';

export interface Result {
  data: any;
  message: string;
  success: boolean;
  errors: Report[];
}
