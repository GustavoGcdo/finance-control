import { JWTLogin } from '../modules/login/useCases/jwt-login';
import { Login } from '../modules/login/useCases/login';
import { AuthService } from '../modules/shared/services/auth.service';
import { EncriptService } from '../modules/shared/services/encript.service';
import { UserRepository } from '../modules/users/repositories/user.repository';

export const makeLoginUseCase = (): Login => {
  const authService = new AuthService();
  const encriptService = new EncriptService();
  const userRepository = new UserRepository();
  const useCaseLogin = new JWTLogin(userRepository, encriptService, authService);
  return useCaseLogin;
};
