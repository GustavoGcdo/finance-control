import { Result } from '../../../@shared/result';
import { User } from '../../../domain/entities/user';
import { LoginContract } from '../../../infra/contracts/login.contract';
import { ValidationFailedError } from '../../errors/validationFailedError';
import { IUserRepository } from '../../repositories/user-repository.interface';
import { IAuthService } from '../../services/auth-service.interface';
import { IEncriptService } from '../../services/encript-service.interface';
import { LoginDto } from './login.dto';
import { ILogin } from './login.interface';

export class Login implements ILogin {
    private userRepository: IUserRepository;
    private encriptService: IEncriptService;
    private authService: IAuthService;

    constructor(userRepository: IUserRepository,
      encriptService: IEncriptService,
      authService: IAuthService) {
      this.userRepository = userRepository;
      this.encriptService = encriptService;
      this.authService = authService;
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
      const encriptedPassword = await this.encriptService.encript(password);

      const userFound = await this.userRepository.findByEmailAndPassword(email, encriptedPassword);
      if (!userFound) {
        throw new ValidationFailedError('fail to user login',
          { name: 'login', message: 'invalid email or password' });
      }

      return userFound;
    }

    private async generateToken(user: User) {
      const token = await this.authService.generateToken(user);
      return token;
    }
}
