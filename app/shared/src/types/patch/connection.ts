import {
  IAudioContext,
  IAudioNode,
  IAudioParam,
} from "standardized-audio-context";

export type Parameter = {
  moduleKey: string;
  name: string;
  accessor: () => IAudioParam;
};

export const paramKey = (param: Omit<Parameter, "accessor">) =>
  `${param.moduleKey}_${param.name}`;

export enum IoType {
  input,
  output,
}

export type Io<Type extends IoType = IoType> = {
  moduleKey: string;
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
  return `${io.moduleKey}_${io.type}_${io.channel}`;
};
