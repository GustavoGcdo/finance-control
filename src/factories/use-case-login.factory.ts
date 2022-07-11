import { AuthService } from '../modules/shared/services/auth.service';
import { EncriptService } from '../modules/shared/services/encript.service';
import { UserRepository } from '../modules/users/repositories/user.repository';
import { Login } from '../modules/users/useCases/login';
import { ILogin } from '../modules/users/useCases/login.interface';

export const makeLoginUseCase = (): ILogin => {
  const authService = new AuthService();
  const encriptService = new EncriptService();
  const userRepository = new UserRepository();
  const useCaseLogin = new Login(userRepository, encriptService, authService);
  return useCaseLogin;
};
