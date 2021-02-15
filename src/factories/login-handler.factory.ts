import { ILoginHandler } from '../modules/login/handlers/login-handler.interface';
import { LoginHandler } from '../modules/login/handlers/login.handler';
import { AuthService } from '../modules/shared/services/auth.service';
import { EncriptService } from '../modules/shared/services/encript.service';
import { UserRepository } from '../modules/users/repositories/user.repository';

export const makeLoginHandler = (): ILoginHandler => {
  const authService = new AuthService();
  const encriptService = new EncriptService();
  const userRepository = new UserRepository();
  const loginHandler = new LoginHandler(userRepository, encriptService, authService);
  return loginHandler;
};
