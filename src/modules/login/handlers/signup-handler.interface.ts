import { Result } from '../../../infra/models/result';
import { User } from '../../users/models/user';
import { SignupDto } from '../dtos/signup.dto';

export interface ISignupHandler {
    handle(signupDto: SignupDto): Promise<Result<User>>;
}
