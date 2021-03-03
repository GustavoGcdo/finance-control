import { LoginController } from '../presentation/controllers/login.controller';
import { LoginRoutes } from '../presentation/routes/login.routes';
import { makeLoginUseCase } from './use-case-login.factory';
import { makeSignupUseCase } from './use-case-signup.factory';

export const makeLoginRoutes = (): LoginRoutes => {
  const loginController = new LoginController(makeSignupUseCase(), makeLoginUseCase());
  const loginRoutes = new LoginRoutes(loginController);
  return loginRoutes;
};
