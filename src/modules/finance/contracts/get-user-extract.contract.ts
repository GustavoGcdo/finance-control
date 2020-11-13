import { Contract } from '../../../infra/models/contract';
import { Notifiable } from '../../../infra/models/notifiable';
import { Validator } from '../../../infra/validator/validator';
import { GetUserExtractDto } from '../dtos/get-user-extract.dto';

export class GetUserExtractContract extends Notifiable implements Contract {
  private _dto: GetUserExtractDto;
  private _validator: Validator;

  constructor(dto: GetUserExtractDto) {
    super();
    this._dto = dto;
    this._validator = new Validator();
  }

  validate(): boolean {
    this.validateUserId();

    this.addReports(this._validator.reports);
    return this.isValid();
  }

  private validateUserId() {
    this._validator.isRequired(this._dto.userId, 'userId', 'userId is required');
    this._validator.isValidObjectId(this._dto.userId, 'userId', 'userId invalid');
  }
}
