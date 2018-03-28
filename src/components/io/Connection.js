export default class Connection {
  constructor(source, destination) {
    try {
      this.source = {
        target: source.target,
        guid: source.guid
      };
      this.destination = {
        target: destination.target,
        guid: destination.guid
      };
      this.curve = {
        sourceX: source.x,
        sourceY: source.y,
        destX: destination.x,
        destY: destination.y,
        cp1x: this.mean(destination.x, source.x) - ((destination.x - source.x) * 0.1),
        cp1y: this.mean(destination.y, source.y) + (Math.abs(destination.y - source.y) * 0.2) + Math.abs(source.x - destination.x) * .2,
        cp2x: this.mean(destination.x, source.x) + ((destination.x - source.x) * 0.1),
        cp2y: this.mean(destination.y, source.y) + (Math.abs(destination.y - source.y) * 0.2) + Math.abs(source.x - destination.x) * .2
      };
      if (this.source.target.connect != null) {
        this.source.target.connect(this.destination.target);
      }
    } catch (e) { }
  }
  disconnect() {
    this.source.target.disconnect(this.destination.target);
  }
  mean(num1, num2) {
    return (num1 + num2) / 2.0;
  }
}
