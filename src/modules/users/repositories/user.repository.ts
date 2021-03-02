import { UserMap } from '../mappers/user-map';
import { User } from '../models/user';
import UserModel from '../schemas/user.schema';
import { IUserRepository } from './user-repository.interface';

export class UserRepository implements IUserRepository {
  async getById(id: string): Promise<User | null> {
    const userFound = await UserModel.findById(id);
    return userFound ? UserMap.toDomain(userFound) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userFound = await UserModel.findOne({ email });
    return userFound ? UserMap.toDomain(userFound) : null;
  }

  async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const userFound = await UserModel.findOne({ email, password });
    return userFound ? UserMap.toDomain(userFound) : null;
  }

  async create(user: User): Promise<User> {
    const newUser = UserMap.toPersist(user);
    const documentCreated = await UserModel.create(newUser);
    return UserMap.toDomain(documentCreated);
  }

  async updateBalance(userId: string, value: number): Promise<void> {
    await UserModel.updateOne({ _id: userId }, { balance: value });
  }
}
