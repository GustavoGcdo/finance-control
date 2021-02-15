import { sign, verify } from 'jsonwebtoken';
import config from '../../../config';
import { User } from '../../users/models/user';
import { Payload } from '../models/payload';
import { IAuthService } from './auth-service.interface';

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

  async verifyToken(token: string): Promise<Payload> {
    const tokenReplace = this.replaceToken(token);
    const data: any = verify(tokenReplace, config.SALT_KEY);
    return data;
  }

  private replaceToken(token: string) {
    const tokenReplace = token.replace('Bearer ', '');
    return tokenReplace;
  }
}
