import { User } from '../domain/entities/user';

export class UserMap {
  public static toDomain(raw: any): User {

    const userOrError = User.create({
      name: raw.name,
      email: raw.email,
      password: raw.password
    }, raw._id);

    if (userOrError.isLeft()) {
      throw Error('fail to map user to domain: ' + userOrError.value.message);
    }

    return userOrError.value;
  }

  public static toPersist(user: User): any {
    
    return {
      name: user.name,
      email: user.email.value,
      password: user.password
    };
  }
}
