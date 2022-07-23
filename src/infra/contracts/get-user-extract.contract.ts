import { Validator } from '../../@shared/validator';
import { GetUserExtractDto } from '../../application/useCases/getUserExtract/get-user-extract.dto';
import { Contract } from '../models/contract';
import { Notifiable } from '../models/notifiable';

export class GetUserExtractContract extends Notifiable implements Contract<GetUserExtractDto> {
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
