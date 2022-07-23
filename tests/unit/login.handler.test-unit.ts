import { mock } from 'jest-mock-extended';

import { IUserRepository } from '../../src/application/repositories/user-repository.interface';
import { IAuthService } from '../../src/application/services/auth-service.interface';
import { IEncriptService } from '../../src/application/services/encript-service.interface';
import { Login } from '../../src/application/useCases/login/login';
import { User } from '../../src/domain/entities/user';
import { ValidationFailedError } from '../../src/infra/errors/validationFailedError';

describe('UseCase login', () => {
  const mockUserRepository = mock<IUserRepository>();
  const mockEncriptService = mock<IEncriptService>();
  const mockAuthService = mock<IAuthService>();

  it('deve falhar ao fazer login com senha vazia', async () => {
    const login = new Login(mockUserRepository, mockEncriptService, mockAuthService);
    const invalidLogin = { email: '', password: '' };
    await expect(login.handle(invalidLogin)).rejects.toThrow(ValidationFailedError);
  });

  it('deve obter sucesso ao fazer login valido', async () => {
    mockUserRepository.findByEmailAndPassword.mockReturnValue(Promise.resolve({} as User));
    mockAuthService.generateToken.mockReturnValue(Promise.resolve('fakeToken'));

    const login = new Login(mockUserRepository, mockEncriptService, mockAuthService);
    const validLogin = { email: 'email@email.com', password: 'senha123' };
    const result = await login.handle(validLogin);

    expect(result.success).toBeTruthy();
    expect(result.data).toHaveProperty('token');
    expect(result.data.token).toContain('fakeToken');
  });

  it('deve falhar ao tentar fazer login sem usuario cadastrado', async () => {
    mockUserRepository.findByEmailAndPassword.mockResolvedValue(null);

    const login = new Login(mockUserRepository, mockEncriptService, mockAuthService);
    const validLogin = { email: 'email@email.com', password: 'senha123' };
    await expect(login.handle(validLogin)).rejects.toThrow(ValidationFailedError);
  });
});
