import { IConnector } from '../types/connection';

export type IRegisterConnector = {
	type: 'RegisterConnector';
	payload: IConnector;
};

export type IUnregisterConnector = {
	type: 'UnregisterConnector';
	payload: IConnector;
};

export const registerConnectorAction = (
	connector: IConnector,
): IRegisterConnector => ({
	type: 'RegisterConnector',
	payload: connector,
});

export const unregisterConnectorAction = (
	connector: IConnector,
): IUnregisterConnector => ({
	type: 'UnregisterConnector',
	payload: connector,
});
