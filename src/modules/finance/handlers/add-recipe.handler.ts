import { inject, injectable } from 'inversify';
import { ValidationFailedError } from '../../../infra/errors/validationFailedError';
import { Result } from '../../../infra/models/result';
import { IUserRepository } from '../../users/repositories/user-repository.interface';
import UserTypes from '../../users/types/user.types';
import { AddRecipeContract } from '../contracts/add-recipe.contract';
import { AddRecipeDto } from '../dtos/add-recipe.dto';
import { IAddRecipeHandler } from './add-recipe-handler.interface';
import { IOperationRepository } from '../repositories/operation-repository.interface';
import FinanceTypes from '../types/finance.types';
import { Operation } from '../models/entities/operation';
import { OperationType } from '../models/enums/operation-type.enum';
import { UserOperation } from '../models/entities/user-operation';

@injectable()
export class AddRecipeHandler implements IAddRecipeHandler {
    private _userRepository: IUserRepository;
    private _operationRepository: IOperationRepository;

    constructor(@inject(UserTypes.UserRepository) userRepository: IUserRepository,
        @inject(FinanceTypes.OperationRepository) operationRepository: IOperationRepository) {
        this._userRepository = userRepository;
        this._operationRepository = operationRepository;
    }

    async handle(addRecipeDto: AddRecipeDto): Promise<Result> {
        this.validate(addRecipeDto);
        await this.addRecipe(addRecipeDto);
        const resultSucess = new Result(null, 'recipe added successfully', true, []);
        return resultSucess;
    }

    private validate(addRecipeDto: AddRecipeDto) {
        this.validateContract(addRecipeDto);
    }

    private validateContract(addRecipeDto: AddRecipeDto) {
        const contract = new AddRecipeContract(addRecipeDto);
        const isInvalid = !contract.validate();

        if (isInvalid) {
            throw new ValidationFailedError('fail to add recipe', ...contract.reports);
        }
    }

    async addRecipe(addRecipeDto: AddRecipeDto) {

        const { userId, value } = addRecipeDto;

        const userToAddRecipe = await this.findUser(userId);       
        const userOperation = userToAddRecipe as UserOperation;
        const newValue = Number(value);

        const newOperation = {
            type: OperationType.RECIPE,
            value: newValue,
            user: userOperation,
            executed: true
        } as Operation;

        const { balance } = userToAddRecipe;
        let newBalance = balance ? balance : 0;
        newBalance += newValue;

        await this._operationRepository.add(newOperation)
        await this._userRepository.updateBalance(userId, newBalance);

    }

    private async findUser(userId: string) {
        const userFound = await this._userRepository.getById(userId);
        
        if (!userFound) {            
            throw new ValidationFailedError('fail to add recipe', { name: 'user', message: 'non-existent user' });
        }

        return userFound;
    }
}