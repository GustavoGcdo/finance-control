import { Result } from '../../../infra/models/result';
import { LoginDto } from '../dtos/login.dto';

export interface ILoginHandler {
    handle(loginDto: LoginDto): Promise<Result>;
}