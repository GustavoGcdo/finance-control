import { mock } from 'jest-mock-extended';
import { ValidationFailedError } from '../../src/infra/errors/validationFailedError';
import { JWTLogin } from '../../src/modules/login/useCases/jwt-login';
import { IAuthService } from '../../src/modules/shared/services/auth-service.interface';
import { IEncriptService } from '../../src/modules/shared/services/encript-service.interface';
import { User } from '../../src/modules/users/models/user';
import { IUserRepository } from '../../src/modules/users/repositories/user-repository.interface';

describe('UseCase login', () => {
  const mockUserRepository = mock<IUserRepository>();
  const mockEncriptService = mock<IEncriptService>();
  const mockAuthService = mock<IAuthService>();

  it('deve falhar ao fazer login com senha vazia', async () => {
    const login = new JWTLogin(mockUserRepository, mockEncriptService, mockAuthService);
    const invalidLogin = { email: '', password: '' };
    await expect(login.handle(invalidLogin)).rejects.toThrow(ValidationFailedError);
  });

  it('deve obter sucesso ao fazer login valido', async () => {
    mockUserRepository.findByEmailAndPassword.mockReturnValue(Promise.resolve({} as User));
    mockAuthService.generateToken.mockReturnValue(Promise.resolve('fakeToken'));

    const login = new JWTLogin(mockUserRepository, mockEncriptService, mockAuthService);
    const validLogin = { email: 'email@email.com', password: 'senha123' };
    const result = await login.handle(validLogin);

    expect(result.success).toBeTruthy();
    expect(result.data).toHaveProperty('token');
    expect(result.data.token).toContain('fakeToken');
  });

  it('deve falhar ao tentar fazer login sem usuario cadastrado', async () => {
    const mockUserReturn = new Promise<User>((resolve) => resolve(undefined));
    mockUserRepository.findByEmailAndPassword.mockReturnValue(mockUserReturn);

    const login = new JWTLogin(mockUserRepository, mockEncriptService, mockAuthService);
    const validLogin = { email: 'email@email.com', password: 'senha123' };
    await expect(login.handle(validLogin)).rejects.toThrow(ValidationFailedError);
  });
});
