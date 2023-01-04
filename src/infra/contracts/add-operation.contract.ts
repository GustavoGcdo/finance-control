import { Validator } from '../../@shared/validator';
import { AddOperationDto } from '../../application/useCases/addOperation/add-operation.dto';
import { EOperationType } from '../../domain/enums/operation-type.enum';
import { Contract } from '../models/contract';
import { Notifiable } from '../models/notifiable';

export class AddOperationContract extends Notifiable implements Contract<AddOperationDto> {
  private dto: AddOperationDto;
  private validator: Validator;

  constructor(dto: AddOperationDto) {
    super();
    this.dto = dto;
    this.validator = new Validator();
  }

  validate(): boolean {
    this.validateUserId();
    this.validateOperationType();
    this.validateValueToAdd();

    this.addReports(this.validator.reports);
    return this.isValid();
  }

  private validateUserId() {
    this.validator.isRequired(this.dto.userId, 'userId', 'userId is required');
    this.validator.isValidObjectId(this.dto.userId, 'userId', 'userId invalid');
  }

  private validateOperationType() {
    const isNotValidOperationType = !Object.values(EOperationType).some((v) => v === this.dto.type);
    if (isNotValidOperationType) {
      this.addReport({ name: 'type', message: 'operation invalid' });
    }
  }

  private validateValueToAdd() {
    this.validator.isValidNumber(this.dto.value, 'value', 'value must be a valid number');

    const MIN_VALUE_TO_ADD = 0;
    this.validator.isLessThan(
      this.dto.value,
      MIN_VALUE_TO_ADD,
      'value',
      `value must be greather than ${MIN_VALUE_TO_ADD}`
    );
  }
}
