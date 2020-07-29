import { Contract } from '../../../infra/models/contract';
import { Notifiable } from '../../../infra/models/notifiable';
import { SignupDto } from '../dtos/signup.dto';
import { Validator } from '../../../infra/validator/validator';


export class SignupContract extends Notifiable implements Contract {

    private dto: SignupDto;
    private validator: Validator;

    constructor(dto: SignupDto) {
        super();
        this.dto = dto;
        this.validator = new Validator();
    }

    validate(): boolean {

        this.validateName();
        this.validateEmail();
        this.validatePassword();
        this.validateConfirmPassword();

        this.addReports(this.reports);
        return this.isValid();
    }


    private validateName() {
        this.validator.isRequired(this.dto.name, 'name', 'name is required');
    }

    private validateEmail() {
        const { email } = this.dto;
        this.validator.isRequired(email, 'email', 'email is required');
        this.validator.isValidEmail(email, 'email', 'invalid email');
    }

    private validatePassword() {
        const { password } = this.dto;
        this.validator.isRequired(password, 'password', 'password is required');

        if (password) {
            const MIN_PASSWORD_LENGTH = 6;
            this.validator.isLessThan(password.length, MIN_PASSWORD_LENGTH,
                'password', `password must be at least 6 characters`,
            );
        }
    }

    private validateConfirmPassword() {
        this.validator.isRequired(this.dto.confirmPassword, 'confirmPassword', 'confirmPassword is required');

        if (this.dto.password != this.dto.confirmPassword) {
            this.addReport({ name: 'confirmPassword', message: 'confirm password not match with password' });
        }
    }
}