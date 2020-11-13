import { User } from '../../users/models/user';
import { Payload } from '../models/payload';

export interface IAuthService {
    generateToken(user: User): Promise<string>;
    verifyToken(token: string): Promise<Payload>;
}
