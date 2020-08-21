import { inject, injectable } from 'inversify';
import { ValidationFailedError } from '../../../infra/errors/validationFailedError';
import { Result } from '../../../infra/models/result';
import { IUserRepository } from '../../users/repositories/user-repository.interface';
import UserTypes from '../../users/types/user.types';
import { AddRecipeContract } from '../contracts/add-recipe.contract';
import { AddRecipeDto } from '../dtos/add-recipe.dto';
import { Operation } from '../models/entities/operation';
import { UserOperation } from '../models/entities/user-operation';
import { OperationType } from '../models/enums/operation-type.enum';
import { IOperationRepository } from '../repositories/operation-repository.interface';
import FinanceTypes from '../types/finance.types';
import { IAddExpenseHandler } from './add-expense-handler.interface';
import { AddExpenseDto } from '../dtos/add-expense.dto';

@injectable()
export class AddExpenseHandler implements IAddExpenseHandler {
    private _userRepository: IUserRepository;
    private _operationRepository: IOperationRepository;

    constructor(@inject(UserTypes.UserRepository) userRepository: IUserRepository,
        @inject(FinanceTypes.OperationRepository) operationRepository: IOperationRepository) {
        this._userRepository = userRepository;
        this._operationRepository = operationRepository;
    }

    async handle(addExpenseDto: AddExpenseDto): Promise<Result> {
        await this.validate(addExpenseDto);
        await this.addExpense(addExpenseDto);
        const resultSucess = new Result(null, 'expense added successfully', true, []);
        return resultSucess;
    }

    private async validate(addExpenseDto: AddExpenseDto) {
        this.validateContract(addExpenseDto);
    }

    private validateContract(addExpenseDto: AddExpenseDto) {
        const contract = new AddRecipeContract(addExpenseDto);
        const isInvalid = !contract.validate();

        if (isInvalid) {
            throw new ValidationFailedError('fail to add expense', ...contract.reports);
        }
    }

    async addExpense(addExpenseDto: AddExpenseDto) {
        const { userId, value, paid } = addExpenseDto;

        const userToAddExpense = await this.findUser(userId);
        const userOperation = userToAddExpense as UserOperation;
        const newValue = Number(value);

        const newOperation = {
            type: OperationType.EXPENSE,
            value: newValue,
            user: userOperation,
            executed: paid
        } as Operation;

        const { balance } = userToAddExpense;
        let newBalance = balance ? balance : 0;

        if (paid) {
            newBalance -= newValue;
        }

        await this._operationRepository.add(newOperation)
        await this._userRepository.updateBalance(userId, newBalance);
    }

    private async findUser(userId: string) {
        const userFound = await this._userRepository.getById(userId);
        
        if (!userFound) {            
            throw new ValidationFailedError('fail to add expense', { name: 'user', message: 'non-existent user' });
        }

        return userFound;
    }
}