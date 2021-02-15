import { ISignupHandler } from '../modules/login/handlers/signup-handler.interface';
import { SignupHandler } from '../modules/login/handlers/signup.handler';
import { EncriptService } from '../modules/shared/services/encript.service';
import { UserRepository } from '../modules/users/repositories/user.repository';

export const makeSignupHandler = (): ISignupHandler => {
  const encriptService = new EncriptService();
  const userRepository = new UserRepository();
  const signupHandler = new SignupHandler(userRepository, encriptService);
  return signupHandler;
}
;
