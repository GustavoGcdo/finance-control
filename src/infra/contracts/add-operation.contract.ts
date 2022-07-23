import { AddOperationDto } from '../../application/useCases/addOperation/add-operation.dto';
import { EOperationType } from '../../domain/enums/operation-type.enum';
import { Contract } from '../models/contract';
import { Notifiable } from '../models/notifiable';
import { Validator } from '../validator/validator';

export class AddOperationContract extends Notifiable implements Contract<AddOperationDto> {
  private _dto: AddOperationDto;
  private _validator: Validator;

  constructor(dto: AddOperationDto) {
    super();
    this._dto = dto;
    this._validator = new Validator();
  }

  validate(): boolean {
    this.validateUserId();
    this.validateOperationType();
    this.validateValueToAdd();

    this.addReports(this._validator.reports);
    return this.isValid();
  }

  private validateUserId() {
    this._validator.isRequired(this._dto.userId, 'userId', 'userId is required');
    this._validator.isValidObjectId(this._dto.userId, 'userId', 'userId invalid');
  }

  private validateOperationType() {
    const isNotValidOperationType = !Object.values(EOperationType).some((v) => v === this._dto.type);
    if (isNotValidOperationType) {
      this.addReport({ name: 'type', message: 'operation invalid' });
    }
  }

  private validateValueToAdd() {
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
