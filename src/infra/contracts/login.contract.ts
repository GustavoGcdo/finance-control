import { Validator } from '../../@shared/validator';
import { LoginDto } from '../../application/useCases/login/login.dto';
import { Contract } from '../models/contract';
import { Notifiable } from '../models/notifiable';

export class LoginContract extends Notifiable implements Contract<LoginDto> {
  private dto: LoginDto;
  private validator: Validator;

  constructor(dto: LoginDto) {
    super();
    this.dto = dto;
    this.validator = new Validator();
  }

  validate(): boolean {
    this.validateEmail();
    this.validatePassword();

    this.addReports(this.validator.reports);
    return this.isValid();
  }

  private validateEmail() {
    const { email } = this.dto;
    this.validator.isRequired(email, 'email', 'email is required');
    this.validator.isValidEmail(email, 'email', 'invalid email');
  }

  private validatePassword() {
    const { password } = this.dto;
    this.validator.isRequired(password, 'password', 'password is required');
  }
}
