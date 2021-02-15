import { ValidationFailedError } from '../../../infra/errors/validationFailedError';
import { Result } from '../../../infra/models/result';
import { IAuthService } from '../../shared/services/auth-service.interface';
import { IEncriptService } from '../../shared/services/encript-service.interface';
import { User } from '../../users/models/user';
import { IUserRepository } from '../../users/repositories/user-repository.interface';
import { LoginContract } from '../contracts/login.contract';
import { LoginDto } from '../dtos/login.dto';
import { ILoginHandler } from './login-handler.interface';

export class LoginHandler implements ILoginHandler {
    private _userRepository: IUserRepository;
    private _encriptService: IEncriptService;
    private _authService: IAuthService;

    constructor(userRepository: IUserRepository,
      encriptService: IEncriptService,
      authService: IAuthService) {
      this._userRepository = userRepository;
      this._encriptService = encriptService;
      this._authService = authService;
    }

    async handle(loginDto: LoginDto): Promise<Result<{token: string}>> {
      this.validateContract(loginDto);
      const user = await this.findUser(loginDto);
      const token = await this.generateToken(user);
      return new Result({ token }, 'user successfully logged', true, []);
    }

    private validateContract(loginDto: LoginDto) {
      const contract = new LoginContract(loginDto);
      const isInvalid = !contract.validate();

      if (isInvalid) {
        throw new ValidationFailedError('fail to user login', ...contract.reports);
      }
    }

    private async findUser(loginDto: LoginDto) {
      const { email, password } = loginDto;
      const encriptedPassword = await this._encriptService.encript(password);

      const userFound = await this._userRepository.findByEmailAndPassword(email, encriptedPassword);
      if (!userFound) {
        throw new ValidationFailedError('fail to user login',
          { name: 'login', message: 'invalid email or password' });
      }

      return userFound;
    }

    private async generateToken(user: User) {
      const token = await this._authService.generateToken(user);
      return token;
    }
}
