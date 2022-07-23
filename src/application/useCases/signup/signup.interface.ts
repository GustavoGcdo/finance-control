import { User } from '../../../domain/entities/user';
import { Result } from '../../../infra/models/result';
import { SignupDto } from './signup.dto';

export interface ISignup {
    handle(signupDto: SignupDto): Promise<Result<User>>;
}
