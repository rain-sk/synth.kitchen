import { IAudioParam } from 'standardized-audio-context';
import { IParameter } from '../types/parameter';

export type IUpdateParameterRegistration = {
	type: 'UpdateParameterRegistration';
	payload: IParameter;
};

export const updateParameterRegistrationAction = (
	moduleKey: string,
	name: string,
	accessor: () => IAudioParam
): IUpdateParameterRegistration => ({
	type: 'UpdateParameterRegistration',
	payload: {
		moduleKey,
		name,
		accessor
	}
});
