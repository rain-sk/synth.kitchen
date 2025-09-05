import { Connector } from 'synth.kitchen-shared';

export type IRegisterConnector = {
	type: 'RegisterConnector';
	payload: Connector;
};

export const registerConnectorAction = (
	connector: Connector,
): IRegisterConnector => ({
	type: 'RegisterConnector',
	payload: connector,
});
