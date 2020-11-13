import { User } from '../models/user';

export interface IUserRepository {
    getById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByEmailAndPassword(email: string, password: string): Promise<User>;
    updateBalance(userId: string, value: number): Promise<void>;
    create(user: User): Promise<User>;
}
