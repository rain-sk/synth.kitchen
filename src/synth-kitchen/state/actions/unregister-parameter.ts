import { IParameter } from '../types/parameter';

export type IUnregisterParameter = {
	type: 'UnregisterParameter';
	payload: Omit<IParameter, 'accessor'>;
};

export const unregisterParameterAction = (
	moduleKey: string,
	name: string
): IUnregisterParameter => ({
	type: 'UnregisterParameter',
	payload: {
		moduleKey,
		name
	}
});
