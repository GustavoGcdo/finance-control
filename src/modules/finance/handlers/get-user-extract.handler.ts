import { inject, injectable } from 'inversify';
import { ValidationFailedError } from '../../../infra/errors/validationFailedError';
import { Result } from '../../../infra/models/result';
import { IUserRepository } from '../../users/repositories/user-repository.interface';
import UserTypes from '../../users/types/user.types';
import { GetUserExtractContract } from '../contracts/get-user-extract.contract';
import { GetUserExtractDto } from '../dtos/get-user-extract.dto';
import { Operation } from '../models/entities/operation';
import { OperationType } from '../models/enums/operation-type.enum';
import { IOperationRepository } from '../repositories/operation-repository.interface';
import FinanceTypes from '../types/finance.types';
import { IGetUserExtractHandler } from './get-user-extract-handler.interface';

@injectable()
export class GetUserExtractHandler implements IGetUserExtractHandler {
    private _operationRepository: IOperationRepository;
    private _userRepository: IUserRepository;

    constructor(
        @inject(FinanceTypes.OperationRepository) operationRepository: IOperationRepository,
        @inject(UserTypes.UserRepository) userRepository: IUserRepository
    ) {
        this._operationRepository = operationRepository;
        this._userRepository = userRepository;
    }

    async handle(getUserExtractDto: GetUserExtractDto): Promise<Result> {
        this.validate(getUserExtractDto);
        const userExtract = await this.getUserExtract(getUserExtractDto);
        const resultSuccess = new Result(userExtract, 'successful search for user statement', true, []);
        return resultSuccess;
    }

    private validate(getUserExtractDto: GetUserExtractDto) {
        const contract = new GetUserExtractContract(getUserExtractDto);
        const isInvalid = !contract.validate();

        if (isInvalid) {
            throw new ValidationFailedError('failed to get user statement', ...contract.reports);
        }
    }

    private async getUserExtract(getUserExtractDto: GetUserExtractDto) {
        const { userId } = getUserExtractDto;
        const userFound = await this.findUser(userId);
        const userOperations = await this._operationRepository.get(userFound._id);

        const totalRecipes = this.sumExecutedOperationsByType(userOperations, OperationType.RECIPE);
        const totalExpenses = this.sumExecutedOperationsByType(userOperations, OperationType.EXPENSE);

        const userExtract =
        {
            name: userFound.name,
            email: userFound.email,
            balance: userFound.balance || 0,
            totalRecipes,
            totalExpenses: totalExpenses,
        }

        return userExtract;
    }

    private async findUser(userId: string) {
        const userFound = await this._userRepository.getById(userId);

        if (!userFound) {
            throw new ValidationFailedError('failed to get user statement',
                { name: 'user', message: 'non-existent user' });
        }

        return userFound;
    }

    private sumExecutedOperationsByType(operations: Operation[], type: OperationType): number {
        return operations
            .filter(operation => operation.type === type && operation.executed)
            .map(o => o.value)
            .reduce((acum, item) => item + acum, 0)
    }

}