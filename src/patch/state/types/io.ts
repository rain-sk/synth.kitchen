import { IAudioContext, IAudioNode } from 'standardized-audio-context';

export enum IoType {
	input,
	output
}

export type IIo = {
	moduleKey: string;
	channel: number;
	type: IoType;
	accessor: () => IAudioNode<IAudioContext>;
};

export const ioKey = (io: Omit<IIo, 'accessor'>): string => {
	return `${io.moduleKey}_${io.type}_${io.channel}`;
};
