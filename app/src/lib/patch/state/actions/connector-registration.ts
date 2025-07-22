import { IConnector } from '../types/connection';

export type IRegisterConnector = {
	type: 'RegisterConnector';
	payload: IConnector;
};

export const registerConnectorAction = (
	connector: IConnector,
): IRegisterConnector => ({
	type: 'RegisterConnector',
	payload: connector,
});
