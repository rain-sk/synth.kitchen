import { IConnector } from '../types/connection';

export type IClickConnector = {
	type: 'ClickConnector';
	payload: IConnector;
};

export const clickConnectorAction = (clicked: IConnector): IClickConnector => ({
	type: 'ClickConnector',
	payload: clicked,
});
