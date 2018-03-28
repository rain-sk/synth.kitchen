export default class Connection {
  constructor(src, dst) {
    try {
      this.source = {
        target: src.target,
        guid: src.guid
      };
      this.destination = {
        target: dst.target,
        guid: dst.guid
      };
      this.curve = {
        sourceX: src.x,
        sourceY: src.y,
        destX: dst.x,
        destY: dst.y,
        cp1x: this.mean(dst.x, src.x) - ((dst.x - src.x) * 0.1),
        cp1y: this.mean(dst.y, src.y) + (Math.abs(dst.y - src.y) * 0.2) + Math.abs(src.x - dst.x) * .2,
        cp2x: this.mean(dst.x, src.x) + ((dst.x - src.x) * 0.1),
        cp2y: this.mean(dst.y, src.y) + (Math.abs(dst.y - src.y) * 0.2) + Math.abs(src.x - dst.x) * .2
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
