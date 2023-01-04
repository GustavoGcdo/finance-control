import { Login } from '../../application/useCases/login/login';
import { ILogin } from '../../application/useCases/login/login.interface';
import { UserRepository } from '../repositories/user.repository';
import { AuthService } from '../services/auth.service';
import { EncriptService } from '../services/encript.service';

export const makeLoginUseCase = (): ILogin => {
  const authService = new AuthService();
  const encriptService = new EncriptService();
  const userRepository = new UserRepository();
  const useCaseLogin = new Login(userRepository, encriptService, authService);
  return useCaseLogin;
};
