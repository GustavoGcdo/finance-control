import { makeLoginHandler } from '../../src/factories/login-handler.factory';
import { makeSignupHandler } from '../../src/factories/signup-handler.factory';
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
  const signupHandler = makeSignupHandler();
  const result = await signupHandler.handle(validUser);
  return result.data;
}

async function loginValidUser(): Promise<string> {
  const loginHandler = makeLoginHandler();
  const { email, password } = validUser;
  const loginDto = { email, password };
  const result = await loginHandler.handle(loginDto);
  const { token } = result.data;
  return token;
}
