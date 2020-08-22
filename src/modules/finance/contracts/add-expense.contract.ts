import { Contract } from '../../../infra/models/contract';
import { Notifiable } from '../../../infra/models/notifiable';
import { Validator } from '../../../infra/validator/validator';
import { AddExpenseDto } from '../dtos/add-expense.dto';


export class AddExpenseContract extends Notifiable implements Contract {
    private _dto: AddExpenseDto;
    private _validator: Validator;

    constructor(dto: AddExpenseDto) {
        super();
        this._dto = dto;
        this._validator = new Validator();
    }


    validate(): boolean {
        this.validateUserId();
        this.validateValueToAdd();

        this.addReports(this._validator.reports);
        return this.isValid();
    }


    private validateUserId() {
        this._validator.isRequired(this._dto.userId, 'userId', 'userId is required');
        this._validator.isValidObjectId(this._dto.userId, 'userId', 'userId invalid');
    }

    private validateValueToAdd() {
        this._validator.isValidNumber(this._dto.value, 'value', 'value must be a valid number');

        const MIN_VALUE_TO_ADD = 0;        
        this._validator.isLessThan(this._dto.value, MIN_VALUE_TO_ADD, 'value',
            `value must be greather than ${MIN_VALUE_TO_ADD}`);
    }
}