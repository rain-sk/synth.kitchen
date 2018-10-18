import * as React from 'react';
import { IOContext } from '../declarations';

export interface IMapConnection {
  destination: [number, number];
  source: [number, number];
}

export interface IIOMap {
  context: IOContext;
  connections: IMapConnection[];
}

export class ConnectionMap extends React.Component<IIOMap> {
  private canvas: any = React.createRef();
  private ctx: CanvasRenderingContext2D;
  //private canvasData: any;
  constructor(props: IIOMap) {
    super(props);
  }
  render() {
    return <canvas ref={this.canvas} />;
  }
  componentDidMount() {
    const canvas = this.canvas.current as HTMLCanvasElement;
    // const canvasWidth = canvas.width;
    // const canvasHeight = canvas.height;
    const ctx = canvas.getContext("2d");
    if (!!ctx) {
      this.ctx = ctx;
      //this.canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    }
  }
  componentDidUpdate() {
    console.table(this.props.connections);
    this.draw(this.props.connections);
    //this.ctx.putImageData(this.canvasData, 0, 0);
  }
  draw(connections: IMapConnection[]) {
    connections.forEach(connection => {
      console.log(connection);
      this.ctx.beginPath();
      this.ctx.moveTo(connection.source[0], connection.source[1]);
      this.ctx.lineTo(connection.destination[0], connection.destination[1]);
      this.ctx.stroke();
    });
  }
}