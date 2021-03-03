import { Result } from '../../../infra/models/result';
import { LoginDto } from '../dtos/login.dto';

export interface Login {
  handle(loginDto: LoginDto): Promise<Result<{token: string}>>;
}
