import { IParameter } from '../state/types/parameter';

export const paramId = (param: Omit<IParameter, 'accessor'>) =>
	`${param.moduleKey}_${param.name}`;
