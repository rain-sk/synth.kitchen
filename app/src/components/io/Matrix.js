import { Connection } from '.';

export default class Matrix {
  constructor() {
    this.nodeMap = new Map();
    this.subMap = new Map();
  }
  connect(source, destination) {
    let connection = new Connection(source, destination);
    let guid = S8();
    this.subMap.set(guid, connection);
    console.log(connection);
    if (this.nodeMap.has(source.guid)) {
      this.nodeMap.set(source.guid, this.nodeMap.get(source.guid).push({ pairKey: destination.guid, connectionKey: guid }));
    } else {
      this.nodeMap.set(source.guid, [{ pairKey: destination.guid, connectionKey: guid }]);
    }
    if (this.nodeMap.has(destination.guid)) {
      this.nodeMap.set(destination.guid, this.nodeMap.get(destination.guid).push({ pairKey: source.guid, connectionKey: guid }));
    } else {
      this.nodeMap.set(destination.guid, [{ pairKey: source.guid, connectionKey: guid }]);
    }
  }
  delete(key) {
    let keys = [key];
    if (this.nodeMap.has(key)) {
      let valueArr = this.nodeMap.get(key);

      let connectionKey = valueArr[0].connectionKey;
      let connection = this.subMap.get(connectionKey);
      connection.disconnect();
      this.subMap.delete(valueArr[0].connectionKey);

      valueArr.forEach(value => {
        keys.push(this.nodeMap.get(value.pairKey));
      });
    }
    keys.forEach(key => {
      this.nodeMap.delete(key);
    });
  }
}

function S8() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}