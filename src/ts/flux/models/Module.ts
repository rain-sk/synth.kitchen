import { BaseEntity } from "./BaseEntity";


export class Module extends BaseEntity {
  nodeKey: string;
  row: number;
  index: number;
  constructor(nodeKey: string) {
    super();

  }
}