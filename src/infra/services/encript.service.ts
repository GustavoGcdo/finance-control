import md5 from 'md5';
import { IEncriptService } from '../../application/services/encript-service.interface';
import config from '../../config';

export class EncriptService implements IEncriptService {
  async encript(text: string): Promise<string> {
    const { SALT_KEY } = config;
    const textEncripted = await md5(`${text}${SALT_KEY}`);
    return textEncripted;
  }
}
