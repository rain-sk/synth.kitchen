import {
  IAudioContext,
  IAudioNode,
  IAudioParam,
} from "standardized-audio-context";

export const connectionKey = (output: Output, input: Input) => {
  return `${connectorKey(output)}|${connectorKey(input)}`;
};

export const connectorKey = (connector: Connector) =>
  "type" in connector ? ioKey(connector) : paramKey(connector);

export type Parameter = {
  moduleId: string;
  name: string;
  accessor: () => IAudioParam;
};

export const paramKey = (param: Omit<Parameter, "accessor">) =>
  `${param.moduleId}_${param.name}`;

export enum IoType {
  input,
  output,
}

export type Io<Type extends IoType = IoType> = {
  moduleId: string;
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

export const ioKey = (io: Omit<Io, "accessor">): string =>
  `${io.moduleId}_${io.type}_${io.channel}`;
