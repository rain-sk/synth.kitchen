import { Connector } from 'synth.kitchen-shared';

export type IClickConnector = {
	type: 'ClickConnector';
	payload: Connector;
};

export const clickConnectorAction = (clicked: Connector): IClickConnector => ({
	type: 'ClickConnector',
	payload: clicked,
});
