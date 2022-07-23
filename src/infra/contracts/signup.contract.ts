import { Validator } from '../../@shared/validator';
import { SignupDto } from '../../application/useCases/signup/signup.dto';
import { Contract } from '../models/contract';
import { Notifiable } from '../models/notifiable';

export class SignupContract extends Notifiable implements Contract<SignupDto> {
    private _dto: SignupDto;
    private _validator: Validator;

    constructor(dto: SignupDto) {
      super();
      this._dto = dto;
      this._validator = new Validator();
    }

    validate(): boolean {
      this.validateName();
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmPassword();

      this.addReports(this._validator.reports);
      return this.isValid();
    }

    private validateName() {
      this._validator.isRequired(this._dto.name, 'name', 'name is required');
    }

    private validateEmail() {
      const { email } = this._dto;
      this._validator.isRequired(email, 'email', 'email is required');
      this._validator.isValidEmail(email, 'email', 'invalid email');
    }

    private validatePassword() {
      const { password } = this._dto;
      this._validator.isRequired(password, 'password', 'password is required');

      if (password) {
        const MIN_PASSWORD_LENGTH = 6;
        this._validator.isLessThan(password.length, MIN_PASSWORD_LENGTH,
          'password', 'password must be at least 6 characters'
        );
      }
    }

    private validateConfirmPassword() {
      this._validator.isRequired(this._dto.confirmPassword, 'confirmPassword', 'confirmPassword is required');

      if (this._dto.password !== this._dto.confirmPassword) {
        this.addReport({ name: 'confirmPassword', message: 'confirm password not match with password' });
      }
    }
}
