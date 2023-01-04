import { Result } from '../../../@shared/result';
import { LoginDto } from './login.dto';

export interface ILogin {
  handle(loginDto: LoginDto): Promise<Result<{token: string}>>;
}
