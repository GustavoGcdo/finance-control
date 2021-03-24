import { Contract } from '../../../infra/models/contract';
import { Notifiable } from '../../../infra/models/notifiable';
import { Validator } from '../../../infra/validator/validator';
import { GetUserOperationsDto } from '../dtos/get-user-operations.dto';

export class GetUserOperationsContract
  extends Notifiable
  implements Contract<GetUserOperationsDto> {
  private _dto: GetUserOperationsDto;
  private _validator: Validator;

  constructor(dto: GetUserOperationsDto) {
    super();
    this._dto = dto;
    this._validator = new Validator();
  }

  validate(): boolean {
    this.validateUserId();
    this.validatePage();
    this.validateLimit();

    this.addReports(this._validator.reports);
    return this.isValid();
  }

  private validateUserId() {
    this._validator.isRequired(this._dto.userId, 'userId', 'userId is required');
    this._validator.isValidObjectId(this._dto.userId, 'userId', 'userId invalid');
  }

  private validatePage() {
    if (this._dto.page !== undefined) {
      this._validator.isValidNumber(this._dto.page, 'page', 'page must be a valid number');
    }
  }

  private validateLimit() {
    if (this._dto.limit !== undefined) {
      const MAX_LIMIT = 100;
      this._validator.isValidNumber(this._dto.limit, 'limit', 'limit must be a valid number');

      this._validator.isGreaterThan(
        parseInt(this._dto.limit),
        MAX_LIMIT,
        'limit',
        `limit must be less than ${MAX_LIMIT}`
      );
    }
  }
}
