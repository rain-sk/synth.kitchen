import { BaseEntity } from "./BaseEntity";
import { NodeType } from "../../enums/NodeType";

export class Node extends BaseEntity {
  constructor(type: NodeType) {
    super();

  }
}