import { User } from '../../src/domain/entities/user';
import { makeLoginUseCase } from '../../src/infra/factories/use-case-login.factory';
import { makeSignupUseCase } from '../../src/infra/factories/use-case-signup.factory';

export const validUser = {
  name: 'Gustavo',
  email: 'gustavo.gcdo@gmail.com',
  password: 'senha123',
  confirmPassword: 'senha123'
};

export async function createAndLoginUser(): Promise<{ userToTest: User; tokenToTest: string; }> {
  const userToTest = await createValidUser();
  const tokenToTest = await loginValidUser();
  return { userToTest, tokenToTest };
}

export async function createValidUser(): Promise<User> {
  const useCaseSignup = makeSignupUseCase();
  const result = await useCaseSignup.handle(validUser);
  return result.data;
}

async function loginValidUser(): Promise<string> {
  const useCaseLogin = makeLoginUseCase();
  const { email, password } = validUser;
  const loginDto = { email, password };
  const result = await useCaseLogin.handle(loginDto);
  const { token } = result.data;
  return token;
}
