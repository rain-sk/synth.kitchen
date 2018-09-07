import { INode } from "./INode";

export class Node implements INode {
  public node: any;
  public hash: string;
  public inputs: string[];
  public outputs: string[];
  public mods: string[];
  public params: string[];
}