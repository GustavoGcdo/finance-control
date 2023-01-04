import { Validator } from '../../@shared/validator';
import { GetUserOperationsDto } from '../../application/useCases/getUserOperations/get-user-operations.dto';
import { Contract } from '../models/contract';
import { Notifiable } from '../models/notifiable';

export class GetUserOperationsContract extends Notifiable implements Contract<GetUserOperationsDto> {
  private dto: GetUserOperationsDto;
  private validator: Validator;

  constructor(dto: GetUserOperationsDto) {
    super();
    this.dto = dto;
    this.validator = new Validator();
  }

  validate(): boolean {
    this.validateUserId();
    this.validatePage();
    this.validateLimit();

    this.addReports(this.validator.reports);
    return this.isValid();
  }

  private validateUserId() {
    this.validator.isRequired(this.dto.userId, 'userId', 'userId is required');
    this.validator.isValidObjectId(this.dto.userId, 'userId', 'userId invalid');
  }

  private validatePage() {
    if (this.dto.page !== undefined) {
      this.validator.isValidNumber(this.dto.page, 'page', 'page must be a valid number');
    }
  }

  private validateLimit() {
    if (this.dto.limit !== undefined) {
      const MAX_LIMIT = 100;
      this.validator.isValidNumber(this.dto.limit, 'limit', 'limit must be a valid number');

      this.validator.isGreaterThan(
        parseInt(this.dto.limit),
        MAX_LIMIT,
        'limit',
        `limit must be less than ${MAX_LIMIT}`
      );
    }
  }
}
