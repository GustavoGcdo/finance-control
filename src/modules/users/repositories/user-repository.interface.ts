import { User } from '../models/user';

export interface IUserRepository {
    addRecipe(userId: string, value: number): Promise<void>;
    create(user: User): Promise<User>;
}