import { Payload } from '../../@shared/payload';
import { User } from '../../domain/entities/user';

export interface IAuthService {
    generateToken(user: User): Promise<string>;
    verifyToken(token: string): Promise<Payload>;
}
