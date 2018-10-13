import * as React from 'react';
import { IOContext } from '../declarations';

export interface IMapConnection {
  destinationX: number;
  destinationY: number;
  sourceX: number;
  sourceY: number;
}

export interface IIOMap {
  context: IOContext;
  connections: IMapConnection[];
}

export class ConnectionMap extends React.Component<IIOMap> {
  private canvas: React.Ref<HTMLCanvasElement> = React.createRef();
  constructor(props: IIOMap) {
    super(props);
  }
  render() {
    return <canvas ref={this.canvas} />;
  }
  componentDidUpdate() {
    console.table(this.props.connections);
  }
}