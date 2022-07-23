
import { Either, left, right } from '../../@shared/either';
import { UserErrors } from '../errors/user.errors';
import { Email } from '../valueObjects/email';

type UserProps = {
  name: string;
  email: Email;
  password: string;
}

type UserData = {
  name: string;
  email: string;
  password: string;
}

export class User {
  public readonly id!: string;
  public readonly name: string;
  public readonly email: Email;
  public readonly password: string;  

  private constructor(userProps: UserProps, id?: string) {
    this.name = userProps.name;
    this.email = userProps.email;
    this.password = userProps.password;    
    if (id) this.id = id;
  }

  public static create(userData: UserData, id?: string): Either<UserErrors.InvalidEmailError, User> {
    const emailOrError = Email.create(userData.email);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    const email = emailOrError.value;
    const defaultValues: UserProps = {
      name: userData.name,
      email: email,
      password: userData.password
    };

    const newUser = new User(defaultValues, id);
    return right(newUser);
  }
}
