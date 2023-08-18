import { IAudioParam } from 'standardized-audio-context';
import { IParameter } from '../types/parameter';

export type IRegisterParameter = {
	type: 'RegisterParameter';
	payload: IParameter;
};

export const registerParameterAction = (
	moduleKey: string,
	name: string,
	accessor: () => IAudioParam
): IRegisterParameter => ({
	type: 'RegisterParameter',
	payload: {
		moduleKey,
		name,
		accessor
	}
});
