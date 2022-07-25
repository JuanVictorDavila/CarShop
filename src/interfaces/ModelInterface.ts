export interface Model<T> {
  create(param: T): Promise<T>;
  read(): Promise<T[]>;
  readOne(param: string): Promise<T | null>;
  update(param: string, entiry: T): Promise<T | null>;
  delete(param: string): Promise<T | null>;
}
