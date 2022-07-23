import { Signup } from '../../application/useCases/signup/signup';
import { ISignup } from '../../application/useCases/signup/signup.interface';
import { UserRepository } from '../repositories/user.repository';
import { EncriptService } from '../services/encript.service';

export const makeSignupUseCase = (): ISignup => {
  const encriptService = new EncriptService();
  const userRepository = new UserRepository();
  const useCaseSignup = new Signup(userRepository, encriptService);
  return useCaseSignup;
};
