import { IIo } from '../types/io';
import { IParameter } from '../types/parameter';

export type IClickConnector = {
	type: 'ClickConnector';
	payload: Omit<IIo, 'accessor'> | Omit<IParameter, 'accessor'>;
};

export const clickIoAction = (io: Omit<IIo, 'accessor'>): IClickConnector => ({
	type: 'ClickConnector',
	payload: io
});

export const clickParamAction = (
	param: Omit<IParameter, 'accessor'>
): IClickConnector => ({
	type: 'ClickConnector',
	payload: param
});
