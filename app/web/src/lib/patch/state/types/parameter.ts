import { IAudioParam } from 'standardized-audio-context';

export type IParameter = {
	moduleKey: string;
	name: string;
	accessor: () => IAudioParam;
};

export const paramKey = (param: Omit<IParameter, 'accessor'>) =>
	`${param.moduleKey}_${param.name}`;
