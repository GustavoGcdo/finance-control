export interface Contract<T> {
  validate(dto: T): boolean;
}
