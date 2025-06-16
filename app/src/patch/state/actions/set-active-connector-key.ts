export type ISetActiveConnectorKey = {
	type: 'SetActiveConnectorKey';
	payload: string | undefined;
};

export const setActiveConnectorKeyAction = (
	connectorKey: string | undefined,
): ISetActiveConnectorKey => ({
	type: 'SetActiveConnectorKey',
	payload: connectorKey,
});
