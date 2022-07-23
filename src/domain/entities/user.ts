
import { Either, left, right } from '../../application/@shared/models/either';
import { UserErrors } from '../errors/user.errors';
import { Email } from '../valueObjects/email';
import { Operation } from './operation';

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
  public readonly _id!: string;
  public readonly name: string;
  public readonly email: Email;
  public readonly password: string;
  private _operations: Operation[];

  private constructor(userProps: UserProps, id?: string) {
    this.name = userProps.name;
    this.email = userProps.email;
    this.password = userProps.password;
    this._operations = [];
    if (id) this._id = id;
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
