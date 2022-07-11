import { Result } from '../../../infra/models/result';
import { User } from '../domain/entities/user';
import { SignupDto } from '../dtos/signup.dto';

export interface ISignup {
    handle(signupDto: SignupDto): Promise<Result<User>>;
}
