import { injectable } from 'inversify';
import { sign } from 'jsonwebtoken';
import { User } from '../../users/models/user';
import { IAuthService } from './auth-service.interface';
import { Payload } from '../models/payload';
import config from '../../../config';

@injectable()
export class AuthService implements IAuthService {

    async generateToken(user: User): Promise<string> {
        const dataToken: Payload = {
            _id: user._id,
            name: user.name,
            email: user.email
        };

        const token = await sign(dataToken, config.SALT_KEY);
        return token;
    }
}