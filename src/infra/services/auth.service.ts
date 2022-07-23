import { sign, verify } from 'jsonwebtoken';
import { Payload } from '../../@shared/payload';
import { IAuthService } from '../../application/services/auth-service.interface';
import config from '../../config';
import { User } from '../../domain/entities/user';

export class AuthService implements IAuthService {
  async generateToken(user: User): Promise<string> {
    const dataToken: Payload = {
      _id: user._id,
      name: user.name,
      email: user.email.value
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
