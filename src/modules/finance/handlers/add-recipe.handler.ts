import { inject, injectable } from 'inversify';
import { ValidationFailedError } from '../../../infra/errors/validationFailedError';
import { Result } from '../../../infra/models/result';
import { IUserRepository } from '../../users/repositories/user-repository.interface';
import UserTypes from '../../users/types/user.types';
import { AddRecipeContract } from '../contracts/add-recipe.contract';
import { AddRecipeDto } from '../dtos/add-recipe.dto';
import { IAddRecipeHandler } from './add-recipe-handler.interface';

@injectable()
export class AddRecipeHandler implements IAddRecipeHandler {
    private _userRepository: IUserRepository;

    constructor(@inject(UserTypes.UserRepository) userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    async handle(addRecipeDto: AddRecipeDto): Promise<Result> {
        await this.validate(addRecipeDto);
        await this.addRecipe(addRecipeDto);
        const resultSucess = new Result(null, 'recipe added successfully', true, []);
        return resultSucess;
    }

    private async validate(addRecipeDto: AddRecipeDto) {
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
        this._userRepository.addRecipe(addRecipeDto.userId, addRecipeDto.value)
    }
}