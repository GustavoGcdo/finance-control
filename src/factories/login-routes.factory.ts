import { LoginController } from '../presentation/controllers/login.controller';
import { LoginRoutes } from '../presentation/routes/login.routes';
import { makeLoginHandler } from './login-handler.factory';
import { makeSignupHandler } from './signup-handler.factory';

export const makeLoginRoutes = (): LoginRoutes => {
  const loginController = new LoginController(makeSignupHandler(), makeLoginHandler());
  const loginRoutes = new LoginRoutes(loginController);
  return loginRoutes;
};
