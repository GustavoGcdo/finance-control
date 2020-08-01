import { User } from '../models/user';

export interface IUserRepository {
    getById(id: string): Promise<User>;
    addRecipe(userId: string, value: number): Promise<void>;
    create(user: User): Promise<User>;
}