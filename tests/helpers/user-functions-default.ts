import DIContainer from '../../src/di-container';
import { ILoginHandler } from '../../src/modules/login/handlers/login-handler.interface';
import { ISignupHandler } from '../../src/modules/login/handlers/signup-handler.interface';
import LoginTypes from '../../src/modules/login/types/login.types';
import { User } from '../../src/modules/users/models/user';

export const validUser = {
  name: 'Gustavo',
  email: 'gustavo.gcdo@gmail.com',
  password: 'senha123',
  confirmPassword: 'senha123'
};

export async function createAndLoginUser(): Promise<{userToTest: User;tokenToTest: string;}> {
  const userToTest = await createValidUser();
  const tokenToTest = await loginValidUser();
  return { userToTest, tokenToTest };
}

export async function createValidUser(): Promise<User> {
  const signupHandler = DIContainer.get<ISignupHandler>(LoginTypes.SignupHandler);
  const result = await signupHandler.handle(validUser);
  return result.data;
}

async function loginValidUser(): Promise<string> {
  const loginHandler = DIContainer.get<ILoginHandler>(LoginTypes.LoginHandler);
  const { email, password } = validUser;
  const loginDto = { email, password };
  const result = await loginHandler.handle(loginDto);
  const { token } = result.data;
  return token;
}
