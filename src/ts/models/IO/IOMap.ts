import { IO } from './IO';
import { Mod } from './Mod';
import { Param } from './Param';
import { S8 } from '../../../S8';

export interface IOPair {
  source: any;
  target: any;
  sourceHash: string;
  targetHash: string;
}

export class IOMap {
  public outer: Map<string, Set<string>>;
  public inner: Map<string, IOPair>;
  public nodes: Map<string, IO | Mod | Param>;
  constructor() {
    this.outer = new Map<string, Set<string>>();
    this.inner = new Map<string, IOPair>();
    this.nodes = new Map<string, IO | Mod | Param>();
  }
  public hasConnection(hashOne: string, hashTwo: string): boolean {
    if (this.nodes.has(hashOne) && this.nodes.has(hashTwo)) {
      for (
        let i = 0, pair = this.inner.get(this.inner.keys[i]);
        this.nodes.has(hashOne) && this.nodes.has(hashTwo) && i < this.nodes.keys.length;
        pair = this.inner.get(this.inner.keys[++i])) {
        if (pair !== undefined) {
          if ((pair.sourceHash === hashOne && pair.targetHash === hashTwo) || (pair.sourceHash === hashTwo && pair.targetHash === hashOne)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  public connect(pair: IOPair): void {
    if (!this.hasConnection(pair.sourceHash, pair.targetHash)) {
      if ('connect' in pair.source && typeof pair.source.connect === 'function') {
        pair.source.connect(pair.target);
      } else if ('connect' in pair.target && typeof pair.target.connect === 'function') {
        pair.target.connect(pair.source);
      } else {
        throw null;
      }
      // inner
      const pairHash = S8();
      this.inner.set(pairHash, pair);
      // source
      let sourceSet = this.outer.get(pair.sourceHash);
      if (!!sourceSet) {
        sourceSet.add(pairHash);
      } else {
        sourceSet = new Set<string>([pairHash]);
      }
      this.outer.set(pair.sourceHash, sourceSet);
      // target
      let targetSet = this.outer.get(pair.targetHash);
      if (!!targetSet) {
        targetSet.add(pairHash);
      } else {
        targetSet = new Set<string>([pairHash]);
      }
      this.outer.set(pair.targetHash, targetSet);
    }
  }
  public disconnect(hashOne: string, hashTwo: string): void {
    if (this.hasConnection(hashOne, hashTwo)) {
      for (
        let i = 0, key = this.inner.keys[i].toString(), pair = this.inner.get(key);
        this.nodes.has(hashOne) && this.nodes.has(hashTwo) && i < this.nodes.keys.length;
        pair = this.inner.get(this.inner.keys[++i])) {
        if (pair !== undefined) {
          if ((pair.sourceHash === hashOne && pair.targetHash === hashTwo) || (pair.sourceHash === hashTwo && pair.targetHash === hashOne)) {
            // disconnect
            if ('disconnect' in pair.source && typeof pair.source.disconnect === 'function') {
              pair.source.disconnect(pair.target);
            } else if ('disconnect' in pair.target && typeof pair.target.disconnect === 'function') {
              pair.target.disconnect(pair.source);
            } else {
              throw `Attempt to connect ${pair.sourceHash} to ${pair.targetHash}`;
            }
            // clean up
            this.inner.delete(this.inner.keys[i]);
            const setOne = this.outer.get(hashOne);
            if (!!setOne && setOne.delete(key))
              this.outer.set(hashOne, setOne);
            else
              this.outer.set(hashOne, new Set<string>());
            const setTwo = this.outer.get(hashTwo);
            if (!!setTwo && setTwo.delete(key))
              this.outer.set(hashTwo, setTwo);
            else
              this.outer.set(hashTwo, new Set<string>());
          }
        }
      }
    }
  }
}
