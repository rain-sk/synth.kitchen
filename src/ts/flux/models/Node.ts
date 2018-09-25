import { BaseEntity } from "./BaseEntity";
import { ModuleType } from "../../enums/ModuleType";

export class Node extends BaseEntity {
  constructor(type: ModuleType) {
    super();

  }
}