import UserModel from '../schemas/user.schema';
import { IUserRepository } from './user-repository.interface';
import { User } from '../models/user';
import { injectable } from 'inversify';

@injectable()
export class UserRepository implements IUserRepository {

    async getById(id: string): Promise<User> {
        const userFound = await UserModel.findById(id).then(o => o?.toObject());
        return userFound;
    }

    async create(user: User): Promise<User> {
        const documentCreated = await UserModel.create(user);
        const userCreated = documentCreated.toObject();
        return userCreated;
    }

    async updateBalance(userId: string, value: number): Promise<void> {
        await UserModel.updateOne({ _id: userId }, { balance: value });
    }
}