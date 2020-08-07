import { Contract } from '../../../infra/models/contract';
import { Notifiable } from '../../../infra/models/notifiable';
import { Validator } from '../../../infra/validator/validator';
import { LoginDto } from '../dtos/login.dto';

export class LoginContract extends Notifiable implements Contract {

    private _dto: LoginDto;
    private _validator: Validator;

    constructor(dto: LoginDto) {
        super();
        this._dto = dto;
        this._validator = new Validator();
    }

    validate(): boolean {
        this.validateEmail();
        this.validatePassword();

        this.addReports(this._validator.reports);
        return this.isValid();
    }

    private validateEmail() {
        const { email } = this._dto;
        this._validator.isRequired(email, 'email', 'email is required');
        this._validator.isValidEmail(email, 'email', 'invalid email');
    }

    private validatePassword() {
        const { password } = this._dto;
        this._validator.isRequired(password, 'password', 'password is required');
    }

}