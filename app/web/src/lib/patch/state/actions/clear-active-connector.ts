export type IClearActiveConnector = {
	type: 'ClearActiveConnector';
};

export const clearActiveConnectorAction = (): IClearActiveConnector => ({
	type: 'ClearActiveConnector',
});
