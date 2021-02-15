import { User } from '../models/user';
import UserModel from '../schemas/user.schema';
import { IUserRepository } from './user-repository.interface';

export class UserRepository implements IUserRepository {
  async getById(id: string): Promise<User> {
    const userFound = await UserModel.findById(id).then((o) => o?.toObject()) as User;
    return userFound;
  }

  async findByEmail(email: string): Promise<User> {
    const userFound = await UserModel.findOne({ email }).then((o) =>
      o?.toObject()
    ) as User;
    return userFound;
  }

  async findByEmailAndPassword(email: string, password: string): Promise<User> {
    const userFound = await UserModel.findOne({ email, password }).then((o) =>
      o?.toObject()
    ) as User;
    return userFound;
  }

  async create(user: User): Promise<User> {
    const documentCreated = await UserModel.create(user);
    const userCreated = documentCreated.toObject() as User;
    return userCreated;
  }

  async updateBalance(userId: string, value: number): Promise<void> {
    await UserModel.updateOne({ _id: userId }, { balance: value });
  }
}
