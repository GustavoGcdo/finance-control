import { Operation } from '../../operations/domain/entities/operation';
import { EOperationType } from '../../operations/domain/enums/operation-type.enum';
import { Either, left, right } from '../../shared/models/either';
import { UserErrors } from '../errors/user.errors';
import { Email } from '../valueObjects/email';

type UserProps = {
  name: string;
  email: Email;
  password: string;
  balance: number;
}

type UserData = {
  name: string;
  email: string;
  password: string;
  balance?: number;
}

export class User {
  public readonly _id!: string;
  public readonly name: string;
  public readonly email: Email;
  public readonly password: string;
  private _balance: number;
  private _operations: Operation[];

  private constructor(userProps: UserProps, id?: string) {
    this.name = userProps.name;
    this.email = userProps.email;
    this.password = userProps.password;
    this._balance = userProps.balance;
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
      balance: userData.balance || 0,
      password: userData.password
    };

    const newUser = new User(defaultValues, id);
    return right(newUser);
  }

  public addOperation(operation: Operation) {
    let newBalance = this.balance;

    if (operation.executed && operation.type.value === EOperationType.EXPENSE) {
      newBalance -= operation.value;
    }

    if (operation.executed && operation.type.value === EOperationType.RECIPE) {
      newBalance += operation.value;
    }

    this._balance = newBalance;
    this._operations.push(operation);
  }

  public get balance(): number {
    return this._balance;
  }
}
