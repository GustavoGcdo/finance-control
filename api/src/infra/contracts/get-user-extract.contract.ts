import { Validator } from '../../@shared/validator';
import { GetUserExtractDto } from '../../application/useCases/getUserExtract/get-user-extract.dto';
import { Contract } from '../models/contract';
import { Notifiable } from '../models/notifiable';

export class GetUserExtractContract extends Notifiable implements Contract<GetUserExtractDto> {
  private dto: GetUserExtractDto;
  private validator: Validator;

  constructor(dto: GetUserExtractDto) {
    super();
    this.dto = dto;
    this.validator = new Validator();
  }

  validate(): boolean {
    this.validateUserId();

    this.addReports(this.validator.reports);
    return this.isValid();
  }

  private validateUserId() {
    this.validator.isRequired(this.dto.userId, 'userId', 'userId is required');
    this.validator.isValidObjectId(this.dto.userId, 'userId', 'userId invalid');
  }
}
