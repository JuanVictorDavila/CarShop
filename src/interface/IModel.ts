export interface IModel<T> {
  create(param: T): Promise<T>;
  read(): Promise<T[]>;
  update(param: string, entiry: T): Promise<T | null>;
  delete(param: string): Promise<T | null>;
  readOne(param: string): Promise<T | null>;
}
