import { inject, injectable } from 'inversify';
import { ValidationFailedError } from '../../../infra/errors/validationFailedError';
import { Result } from '../../../infra/models/result';
import { IUserRepository } from '../../users/repositories/user-repository.interface';
import UserTypes from '../../users/types/user.types';
import { SignupContract } from '../contracts/signup.contract';
import { SignupDto } from '../dtos/signup.dto';
import { ISignupHandler } from './signup-handler.interface';

@injectable()
export class SignupHandler implements ISignupHandler {
    private _userRepository: IUserRepository

    constructor(@inject(UserTypes.UserRepository) userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    async handle(signupDto: SignupDto): Promise<Result> {
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
        return await this._userRepository.create(signupDto);
    }
}