import md5 from 'md5';
import config from '../../../config';
import { IEncriptService } from './encript-service.interface';

export class EncriptService implements IEncriptService {
  async encript(text: string): Promise<string> {
    const { SALT_KEY } = config;
    const textEncripted = await md5(`${text}${SALT_KEY}`);
    return textEncripted;
  }
}
