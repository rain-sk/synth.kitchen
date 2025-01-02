import { IAudioContext, IAudioNode } from 'standardized-audio-context';
import { IParameter } from './parameter';

export enum IoType {
	input,
	output,
}

export type IIo = {
	moduleKey: string;
	channel: number;
	type: IoType;
	accessor: () => IAudioNode<IAudioContext>;
};

export type IOutput = IIo;
export type IInput = IIo | IParameter;
export type IConnector = IOutput | IInput;

export type IConnectorInfo = [IConnector, Set<string>];

export const ioKey = (io: Omit<IIo, 'accessor'>): string => {
	return `${io.moduleKey}_${io.type}_${io.channel}`;
};
