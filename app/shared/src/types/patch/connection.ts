import {
  IAudioContext,
  IAudioNode,
  IAudioParam,
} from "standardized-audio-context";

export type Parameter = {
  id: string;
  name: string;
  accessor: () => IAudioParam;
};

export const paramKey = (param: Omit<Parameter, "accessor">) =>
  `${param.id}_${param.name}`;

export enum IoType {
  input,
  output,
}

export type Io<Type extends IoType = IoType> = {
  id: string;
  channel: number;
  type: Type;
  accessor: () => IAudioNode<IAudioContext>;
};

export type Output = Io<IoType.output>;
export type Input = Io<IoType.input> | Parameter;
export type Connector = Output | Input;

export type ConnectionInfo = {
  color: string;
};
export type Connection = [Output, Input] | [Output, Input, ConnectionInfo];

export const ioKey = (io: Omit<Io, "accessor">): string => {
  return `${io.id}_${io.type}_${io.channel}`;
};
