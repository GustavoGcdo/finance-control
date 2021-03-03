import { Result } from '../../../infra/models/result';
import { SignupDto } from '../dtos/signup.dto';
import { User } from '../models/user';

export interface ISignup {
    handle(signupDto: SignupDto): Promise<Result<User>>;
}
