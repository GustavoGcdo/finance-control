import { Result } from '../../../@shared/result';
import { User } from '../../../domain/entities/user';
import { SignupDto } from './signup.dto';

export interface ISignup {
    handle(signupDto: SignupDto): Promise<Result<User>>;
}
