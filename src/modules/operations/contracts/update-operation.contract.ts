import { Contract } from '../../../infra/models/contract';
import { Notifiable } from '../../../infra/models/notifiable';
import { Validator } from '../../../infra/validator/validator';
import { EOperationType } from '../domain/enums/operation-type.enum';
import { UpdateOperationDto } from '../dtos/update-operation.dto';


export class UpdateOperationContract extends Notifiable implements Contract<UpdateOperationDto> {
  private _dto: UpdateOperationDto;
  private _validator: Validator;

  constructor(dto: UpdateOperationDto) {
    super();
    this._dto = dto;
    this._validator = new Validator();
  }

  validate(): boolean {
    this.validateUserId();
    this.validateOperationId();
    this.validateOperationType();
    this.validateValueToAdd();
    this.validateDate();

    this.addReports(this._validator.reports);
    return this.isValid();
  }

  private validateUserId() {
    this._validator.isRequired(this._dto.userId, 'userId', 'userId is required');
    this._validator.isValidObjectId(this._dto.userId, 'userId', 'userId invalid');
  }

  private validateOperationId() {
    this._validator.isRequired(this._dto.operationId, 'operationId', 'operationId is required');
    this._validator.isValidObjectId(this._dto.operationId, 'operationId', 'operationId invalid');
  }

  private validateOperationType() {
    if (this._dto.type) {
      const isNotValidOperationType = !Object.values(EOperationType).some((v) => v === this._dto.type);
      if (isNotValidOperationType) {
        this.addReport({ name: 'type', message: 'operation invalid' });
      }
    }
  }

  private validateValueToAdd() {
    if (this._dto.value) {
      this._validator.isValidNumber(this._dto.value, 'value', 'value must be a valid number');

      const MIN_VALUE_TO_ADD = 0;
      this._validator.isLessThan(
        this._dto.value,
        MIN_VALUE_TO_ADD,
        'value',
        `value must be greather than ${MIN_VALUE_TO_ADD}`
      );
    }
  }

  private validateDate() {
    if (this._dto.date) {
      const newDate = new Date(this._dto.date);
      if (newDate.toString() === 'Invalid Date') {
        this.addReport({ name: 'date', message: 'invalid date' });
      }
    }
  }
}
