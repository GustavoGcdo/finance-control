import { Report } from './report';
export class Notifiable {
  private _reports: Report[];

  constructor() {
    this._reports = [];
  }

  addReport(...reports: Report[]): void {
    this._reports = this.reports.concat(reports);
  }

  addReports(reports: Report[]): void {
    this._reports.push(...reports);
  }

  isValid(): boolean {
    return this._reports.length === 0;
  }

  clearReports(): void {
    this._reports = [];
  }

  public get reports(): Report[] {
    return this._reports;
  }
}
