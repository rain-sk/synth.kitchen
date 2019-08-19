import * as React from "react";
import { ConnectionType } from "../../store/ducks/patch";
import { ConnectorCable } from "./connector-cable";
import { ConnectorCircle } from "./connector-circle";

export interface IConnectionProps {
  context: CanvasRenderingContext2D;
  sourceX: number;
  sourceY: number;
  destinationX: number;
  destinationY: number;
  cp1x: number;
  cp1y: number;
  cp2x: number;
  cp2y: number;
  type: ConnectionType;
}

export const Connection: React.FunctionComponent<IConnectionProps> = props => {
  return (
    <>
      <ConnectorCable {...props} />
      <ConnectorCircle {...props} x={props.sourceX} y={props.sourceY} />
      <ConnectorCircle
        {...props}
        x={props.destinationX}
        y={props.destinationY}
      />
    </>
  );
};
