import {
  IAudioContext,
  IAudioNode,
  IAudioParam,
} from "standardized-audio-context";

export type CONNECTIONS_STATE_VERSIONS = ["0.5.7", "0.5.6", "0.5.5"];
export const CONNECTIONS_STATE_VERSIONS: CONNECTIONS_STATE_VERSIONS = [
  "0.5.7",
  "0.5.6",
  "0.5.5",
];

export type CONNECTIONS_STATE = {
  ["0.5.7"]: {
    version: "0.5.7";
    state: Record<string, Connection>;
  };
  ["0.5.6"]: {
    version: "0.5.6";
    state: Record<string, Connection>;
  };
  ["0.5.5"]: { version?: "0.5.5" } & Record<string, Connection>;
};

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

export type ConnectionsState = CONNECTIONS_STATE[CONNECTIONS_STATE_VERSIONS[0]];

export const ioKey = (io: Omit<Io, "accessor">): string =>
  `${io.moduleId}_${io.type}_${io.channel}`;
