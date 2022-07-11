import { User } from '../domain/entities/user';

export class UserMap {
  public static toDomain(raw: any): User {
    // console.log(raw);

    const userOrError = User.create({
      name: raw.name,
      balance: raw.balance,
      email: raw.email,
      password: raw.password
    }, raw._id);

    if (userOrError.isLeft()) {
      throw Error('fail to map user to domain: ' + userOrError.value.message);
    }

    return userOrError.value;
  }

  public static toPersist(user: User): any {
    // console.log(user);

    return {
      name: user.name,
      email: user.email.value,
      balance: user.balance,
      password: user.password
    };
  }
}
