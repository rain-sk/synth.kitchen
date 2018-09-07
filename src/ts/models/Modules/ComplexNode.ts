import { INode } from "./INode";
import { NodeMap } from "./NodeMap";
import { IOMap } from "../IO/IOMap";

export class ComplexNode implements INode {
  public nodes: NodeMap;
  public io: IOMap;
  public hash: string;
  public inputs: string[];
  public outputs: string[];
  public mods: string[];
  public params: string[];
}