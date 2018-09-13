import { BaseEntity } from "./BaseEntity";
import { IOType } from "../../enums/IOType";

export class IONode extends BaseEntity {
  target: any;
  types: IOType[];
  options?: string[];
  constructor(target: any, types: IOType[], options?: string[]) {
    super();
    this.target = target;
    this.types = types;
    this.options = options;
  }
}