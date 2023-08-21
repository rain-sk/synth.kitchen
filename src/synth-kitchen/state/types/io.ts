import {
	IAudioContext,
	IAudioNode,
	IAudioParam
} from 'standardized-audio-context';

export enum IoType {
	input,
	output
}

export type IIo = {
	moduleKey: string;
	channel: number;
	type: IoType;
	accessor: () => IAudioNode<IAudioContext> | IAudioParam;
};

export type IoKey = string;

export const ioKey = (io: Omit<IIo, 'accessor'>): IoKey => {
	return `${io.moduleKey}_${io.type}_${io.channel}`;
};
