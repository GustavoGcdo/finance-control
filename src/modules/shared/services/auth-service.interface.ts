import { User } from '../../users/domain/entities/user';
import { Payload } from '../models/payload';

export interface IAuthService {
    generateToken(user: User): Promise<string>;
    verifyToken(token: string): Promise<Payload>;
}
