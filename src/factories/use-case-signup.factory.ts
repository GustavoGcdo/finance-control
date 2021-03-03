import { Signup } from '../modules/login/useCases/signup';
import { SimpleSignup } from '../modules/login/useCases/simple-signup';
import { EncriptService } from '../modules/shared/services/encript.service';
import { UserRepository } from '../modules/users/repositories/user.repository';

export const makeSignupUseCase = (): Signup => {
  const encriptService = new EncriptService();
  const userRepository = new UserRepository();
  const useCaseSignup = new SimpleSignup(userRepository, encriptService);
  return useCaseSignup;
};
