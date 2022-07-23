import { Result } from '../../../@shared/result';
import { User } from '../../../domain/entities/user';
import { SignupContract } from '../../../infra/contracts/signup.contract';
import { ValidationFailedError } from '../../errors/validationFailedError';
import { IUserRepository } from '../../repositories/user-repository.interface';
import { IEncriptService } from '../../services/encript-service.interface';
import { SignupDto } from './signup.dto';
import { ISignup } from './signup.interface';

export class Signup implements ISignup {
  private userRepository: IUserRepository;
  private encriptService: IEncriptService;

  constructor(userRepository: IUserRepository,
    encriptService: IEncriptService) {
    this.userRepository = userRepository;
    this.encriptService = encriptService;
  }

  async handle(signupDto: SignupDto): Promise<Result<User>> {
    await this.validate(signupDto);
    const userCreated = await this.createUser(signupDto);
    const resultSucess = new Result(userCreated, 'user successfully registered', true, []);
    return resultSucess;
  }

  private async validate(signupDto: SignupDto) {
    this.validateContract(signupDto);
  }

  private validateContract(signupDto: SignupDto) {
    const contract = new SignupContract(signupDto);
    const isInvalid = !contract.validate();

    if (isInvalid) {
      throw new ValidationFailedError('fail to register user', ...contract.reports);
    }
  }

  private async createUser(signupDto: SignupDto) {
    const encriptedPassword = await this.encriptService.encript(signupDto.password);

    const userFound = await this.userRepository.findByEmail(signupDto.email);
    if (userFound) {
      throw new ValidationFailedError('fail to register user', { name: 'email', message: 'email already registered' });
    }

    const newUserOrError = User.create({
      email: signupDto.email,
      name: signupDto.name,
      password: encriptedPassword
    });

    if (newUserOrError.isLeft()) {
      throw new ValidationFailedError('fail to register user');
    }

    const userCreated = await this.userRepository.create(newUserOrError.value);

    const returnObject = {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
    } as User;

    return returnObject;
  }
}
