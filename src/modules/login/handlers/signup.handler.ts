import { inject, injectable } from 'inversify';
import { ValidationFailedError } from '../../../infra/errors/validationFailedError';
import { Result } from '../../../infra/models/result';
import { IEncriptService } from '../../shared/services/encript-service.interface';
import SharedTypes from '../../shared/types/shared.types';
import { User } from '../../users/models/user';
import { IUserRepository } from '../../users/repositories/user-repository.interface';
import UserTypes from '../../users/types/user.types';
import { SignupContract } from '../contracts/signup.contract';
import { SignupDto } from '../dtos/signup.dto';
import { ISignupHandler } from './signup-handler.interface';

@injectable()
export class SignupHandler implements ISignupHandler {
    private _userRepository: IUserRepository;
    private _encriptService: IEncriptService;

    constructor(@inject(UserTypes.UserRepository) userRepository: IUserRepository,
        @inject(SharedTypes.EncriptService) encriptService: IEncriptService) {
      this._userRepository = userRepository;
      this._encriptService = encriptService;
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
      const encriptedPassword = await this._encriptService.encript(signupDto.password);

      const userFound = await this._userRepository.findByEmail(signupDto.email);
      if (userFound) {
        throw new ValidationFailedError('fail to register user', { name: 'email', message: 'email already registered' });
      }

      const newUser = {
        email: signupDto.email,
        name: signupDto.name,
        password: encriptedPassword
      } as User;

      const userCreated = await this._userRepository.create(newUser);

      const returnObject = {
        _id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
        balance: userCreated.balance
      } as User;

      return returnObject;
    }
}
