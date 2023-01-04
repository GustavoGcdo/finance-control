import { Validator } from '../../@shared/validator';
import { UpdateOperationDto } from '../../application/useCases/updateOperation/update-operation.dto';
import { EOperationType } from '../../domain/enums/operation-type.enum';
import { Contract } from '../models/contract';
import { Notifiable } from '../models/notifiable';

export class UpdateOperationContract extends Notifiable implements Contract<UpdateOperationDto> {
  private dto: UpdateOperationDto;
  private validator: Validator;

  constructor(dto: UpdateOperationDto) {
    super();
    this.dto = dto;
    this.validator = new Validator();
  }

  validate(): boolean {
    this.validateUserId();
    this.validateOperationId();
    this.validateOperationType();
    this.validateValueToAdd();
    this.validateDate();

    this.addReports(this.validator.reports);
    return this.isValid();
  }

  private validateUserId() {
    this.validator.isRequired(this.dto.userId, 'userId', 'userId is required');
    this.validator.isValidObjectId(this.dto.userId, 'userId', 'userId invalid');
  }

  private validateOperationId() {
    this.validator.isRequired(this.dto.operationId, 'operationId', 'operationId is required');
    this.validator.isValidObjectId(this.dto.operationId, 'operationId', 'operationId invalid');
  }

  private validateOperationType() {
    if (this.dto.type) {
      const isNotValidOperationType = !Object.values(EOperationType).some((v) => v === this.dto.type);
      if (isNotValidOperationType) {
        this.addReport({ name: 'type', message: 'operation invalid' });
      }
    }
  }

  private validateValueToAdd() {
    if (this.dto.value) {
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

  private validateDate() {
    if (this.dto.date) {
      const newDate = new Date(this.dto.date);
      if (newDate.toString() === 'Invalid Date') {
        this.addReport({ name: 'date', message: 'invalid date' });
      }
    }
  }
}
