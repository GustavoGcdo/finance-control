import { User } from '../models/user';

export interface IUserRepository {
    findByEmailAndPassword(email: string, password: string): Promise<User>;
    getById(id: string): Promise<User>;
    updateBalance(userId: string, value: number): Promise<void>;
    create(user: User): Promise<User>;
}