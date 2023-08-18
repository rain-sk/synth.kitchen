import { IAudioParam } from 'standardized-audio-context';

export type IParameter = {
	moduleKey: string;
	name: string;
	accessor: () => IAudioParam;
};
