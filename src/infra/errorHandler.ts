import { Report } from './models/report';

export class ErrorHandler {
  static getFieldErrors(reports: Report[]) {
    const fieldErrors: any = {};

    if (reports) {
      for (const report of reports) {
        let keyValue = fieldErrors[report.name];
        if (!keyValue) {
          fieldErrors[report.name] = report.message;
        }
      }
    }

    return fieldErrors;
  }

  static getErrorMessagesByName(reports: Report[], ...names: string[]) {
    const messages: string[] = [];
    if (reports) {
      for (const name of names) {
        const founded = reports.find((report) => report.name === name);
        if (founded) {
          messages.push(founded.message);
        }
      }
    }

    return messages;
  }
}
