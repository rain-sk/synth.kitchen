import { IAudioContext, IAudioNode } from 'standardized-audio-context';

export type IInput = {
	moduleKey: string;
	channel: number;
	accessor: () => IAudioNode<IAudioContext>;
};
