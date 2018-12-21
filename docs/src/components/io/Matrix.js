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
    let masterKey = S8();
    let keys = new Pair(source.guid, destination.guid);
    let pairExists = false;
    if (this.map.has(keys.k)) {
      let connectionList = this.map.get(keys.k);
      connectionList.forEach(pair => {
        if (pair.k === keys.v) {
          pairExists = true;
        }
      })
      if (!pairExists) {
        connectionList.push(new Pair(keys.v, masterKey));
      }
    } else if (!pairExists) {
      this.map.set(keys.k, [new Pair(keys.v, masterKey)]);
    }
    if (!pairExists) {
      if (this.map.has(keys.v)) {
        let connectionList = this.map.get(keys.v);
        connectionList.push(new Pair(keys.k, masterKey));
      } else {
        this.map.set(keys.v, [new Pair(keys.k, masterKey)]);
      }
      let connection = new Connection(source, destination);
      this.subMap.set(masterKey, connection);
    } else {
      this.delete(keys.k, keys.v);
    }
  }
  delete(key, pairKey?) {
    if (pairKey == null) {
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
    } else {
      if (this.map.has(key) && this.map.has(pairKey)) {
        let keyPairs = this.map.get(key);
        let pairKeyPairs = this.map.get(pairKey);
        let newKeyPairs = [];
        let newPairKeyPairs = [];
        keyPairs.forEach(pair => {
          if (pair.k !== pairKey) {
            newKeyPairs.push(pair);
          } else {
            this.subMap.get(pair.v).disconnect();
            this.subMap.delete(pair.v);
          }
        });
        pairKeyPairs.forEach(pair => {
          if (pair.k !== key) {
            newPairKeyPairs.push(pair);
          }
        });
        if (newKeyPairs.length > 0) {
          this.map.set(key, newKeyPairs);
        } else {
          this.delete(key);
        }
        if (newPairKeyPairs.length > 0) {
          this.map.set(pairKey, newPairKeyPairs);
        } else {
          this.delete(pairKey);
        }
      }
    }
  }
}

function S8() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}