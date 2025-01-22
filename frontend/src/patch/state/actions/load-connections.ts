export type ILoadConnections = {
	type: 'LoadConnections';
};

export const loadConnectionsAction = (): ILoadConnections => ({
	type: 'LoadConnections',
});
