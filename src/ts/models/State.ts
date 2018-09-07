import { IOMap } from "./IO/IOMap";
import { NodeMap } from "./Modules/NodeMap";
import { INode } from "./Modules/INode";
import { IO } from "./IO/IO";
import { Mod } from "./IO/Mod";
import { Param } from "./IO/Param";

export class State {
  public static audioContext: AudioContext = new AudioContext();
  public io: IOMap;
  public nodes: NodeMap;
  constructor() {
    this.io = new IOMap();
    this.nodes = new NodeMap();
  }
  public registerNode(hash: string, node: INode) {
    this.nodes.set(hash, node);
  }
  public registerIO(hash: string, node: IO | Mod | Param) {
    this.io.nodes.set(hash, node);
  }
  public toggle(hashOne: string, hashTwo: string) {
    try {
      if (this.io.hasConnection(hashOne, hashTwo)) {
        this.io.disconnect(hashOne, hashTwo);
      } else {
        const
          nodeOne = this.io.nodes.get(hashOne),
          nodeTwo = this.io.nodes.get(hashTwo);
        if (!!nodeOne && !!nodeTwo) {
          this.io.connect({
            source: nodeOne,
            sourceHash: hashOne,
            target: nodeTwo,
            targetHash: hashTwo
          });
        }
      }
    } catch (ex) {
      console.error(ex);
    }
  }
}