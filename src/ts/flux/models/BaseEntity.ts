import { S8 } from "../../S8";

export interface IBaseEntity {
  hashKey: string;
}

export class BaseEntity implements IBaseEntity {
  private hash: string;
  constructor() {
    this.hash = S8();
  }
  get hashKey(): string {
    return `${this.hash}`;
  }
}