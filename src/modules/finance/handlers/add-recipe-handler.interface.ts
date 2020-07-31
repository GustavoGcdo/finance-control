import { Result } from '../../../infra/models/result';
import { AddRecipeDto } from '../dtos/add-recipe.dto';

export interface IAddRecipeHandler {
    handle(addRecipeDto: AddRecipeDto): Promise<Result>;
}