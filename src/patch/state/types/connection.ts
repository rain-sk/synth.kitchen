import { IAudioContext, IAudioNode } from 'standardized-audio-context';
import { IParameter } from './parameter';

export enum IoType {
	input,
	output,
}

export type IIo<Type extends IoType = IoType> = {
	moduleKey: string;
	channel: number;
	type: Type;
	accessor: () => IAudioNode<IAudioContext>;
};

export type IOutput = IIo<IoType.output>;
export type IInput = IIo<IoType.input> | IParameter;
export type IConnector = IOutput | IInput;

export type IConnectorInfo = [IConnector, string[]];

export const ioKey = (io: Omit<IIo, 'accessor'>): string => {
	return `${io.moduleKey}_${io.type}_${io.channel}`;
};
