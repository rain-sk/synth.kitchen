import { Connection } from '.';

export default class Drag extends Connection {
  constructor(src, dst) {
    super();
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
  }
  mean(num1, num2) {
    return (num1 + num2) / 2.0;
  }
}
