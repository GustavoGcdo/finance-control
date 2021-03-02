import { User } from '../models/user';

export interface IUserRepository {
    getById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByEmailAndPassword(email: string, password: string): Promise<User | null>;
    updateBalance(userId: string, value: number): Promise<void>;
    create(user: User): Promise<User>;
}
