import { EncriptService } from '../modules/shared/services/encript.service';
import { UserRepository } from '../modules/users/repositories/user.repository';
import { Signup } from '../modules/users/useCases/signup';
import { ISignup } from '../modules/users/useCases/signup.interface';

export const makeSignupUseCase = (): ISignup => {
  const encriptService = new EncriptService();
  const userRepository = new UserRepository();
  const useCaseSignup = new Signup(userRepository, encriptService);
  return useCaseSignup;
};
