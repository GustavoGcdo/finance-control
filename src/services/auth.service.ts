import { Result } from '../infra/models/result';
import api from './api';

export function signIn(loginDto: { email: string; password: string }): Promise<Result> {
  return api.post('/login', loginDto).then((result) => result.data);
}
