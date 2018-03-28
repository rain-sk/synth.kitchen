import { Connection } from '.';

class Pair {
  constructor(k, v) {
    this.k = k;
    this.v = v;
  }
}

export default class Matrix {
  constructor() {
    this.map = new Map();
    this.subMap = new Map();
  }
  connect(source, destination) {
    let connection = new Connection(source, destination);
    let masterKey = S8();
    this.subMap.set(masterKey, connection);
    let keys = new Pair(source.guid, destination.guid);
    if (this.map.has(keys.k)) {
      let connectionList = this.map.get(keys.k);
      connectionList.push(new Pair(keys.v, masterKey));
    } else {
      this.map.set(keys.k, [new Pair(keys.v, masterKey)]);
    }
    if (this.map.has(keys.v)) {
      let connectionList = this.map.get(keys.v);
      connectionList.push(new Pair(keys.k, masterKey));
    } else {
      this.map.set(keys.v, [new Pair(keys.k, masterKey)]);
    }
  }
  delete(key) {
    if (this.map.has(key)) {
      let keysToDelete = [key];
      let keyPairList = this.map.get(key);

      // clean up map
      keyPairList.forEach(relatedKeyPair => {
        let relatedKey = relatedKeyPair.k;

        if (this.map.has(relatedKey)) {
          let relatedKeyPairList = this.map.get(relatedKey);
          let newKeyPairList = [];
          relatedKeyPairList.forEach(pair => {
            if (pair.k !== key) {
              newKeyPairList.push(pair);
            }
          });
          if (newKeyPairList.length > 0) {
            this.map.set(relatedKey, newKeyPairList);
          } else {
            keysToDelete.push(relatedKey);
          }
        }

        // clean up subMap
        let masterKey = relatedKeyPair.v;
        if (this.subMap.has(masterKey)) {
          this.subMap.get(masterKey).disconnect();
          this.subMap.delete(masterKey);
        }
      });

      keysToDelete.forEach(key => {
        this.map.delete(key);
      });
    }
  }
}

function S8() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}