import { User } from '../../users/models/user';
export interface IAuthService {
    generateToken(user: User): Promise<string>;
}