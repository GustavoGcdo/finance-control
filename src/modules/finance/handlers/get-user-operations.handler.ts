import { inject, injectable } from 'inversify';
import { Result } from '../../../infra/models/result';
import { GetUserOperationsDto } from '../dtos/get-user-operations.dto';
import { IGetUserOperationsHandler } from './get-user-operations-handler.interface';
import FinanceTypes from '../types/finance.types';
import { IOperationRepository } from '../repositories/operation-repository.interface';
import { GetUserOperationsContract } from '../contracts/get-user-operations.contract';
import { ValidationFailedError } from '../../../infra/errors/validationFailedError';
import { IUserRepository } from '../../users/repositories/user-repository.interface';
import UserTypes from '../../users/types/user.types';

@injectable()
export class GetUserOperationsHandler implements IGetUserOperationsHandler {
    private _operationRepository: IOperationRepository;
    private _userRepository: IUserRepository;

    constructor(
        @inject(FinanceTypes.OperationRepository) operationRepository: IOperationRepository,
        @inject(UserTypes.UserRepository) userRepository: IUserRepository
    ) {
        this._operationRepository = operationRepository;
        this._userRepository = userRepository;
    }

    async handle(getUserOperationsDto: GetUserOperationsDto): Promise<Result> {
        this.validate(getUserOperationsDto);
        const operations = await this.getOperations(getUserOperationsDto);
        const returnObject = { results: operations };
        const resultSuccess = new Result(returnObject, 'success on fetch user operations', true, []);
        return resultSuccess;
    }

    private validate(getUserOperationsDto: GetUserOperationsDto) {
        this.validateContract(getUserOperationsDto);
    }

    private validateContract(getUserOperationsDto: GetUserOperationsDto) {
        const contract = new GetUserOperationsContract(getUserOperationsDto);
        const isInvalid = !contract.validate();

        if (isInvalid) {
            throw new ValidationFailedError('fail to get operations', ...contract.reports);
        }
    }

    private async getOperations(getUserOperationsDto: GetUserOperationsDto) {
        const { userId } = getUserOperationsDto;
        const userFound = await this.findUser(userId);
        const userOperations = await this._operationRepository.get(userFound._id);
        return userOperations;
    }

    private async findUser(userId: string) {
        const userFound = await this._userRepository.getById(userId);

        if (!userFound) {
            throw new ValidationFailedError('fail to get operations', { name: 'user', message: 'non-existent user' });
        }

        return userFound;
    }
}