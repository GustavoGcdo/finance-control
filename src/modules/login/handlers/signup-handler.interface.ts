import { SignupDto } from '../dtos/signup.dto';
import { Result } from '../../../infra/models/result';

export interface ISignupHandler {
    handle(signupDto: SignupDto): Promise<Result>;
}