import { IInput, IOutput } from '../types/connection';

export type ILoadConnections = {
	type: 'LoadConnections';
	payload: Record<string, [IOutput, IInput]>;
};

export const loadConnectionsAction = (
	connectionsToLoad: Record<string, [IOutput, IInput]>,
): ILoadConnections => ({
	type: 'LoadConnections',
	payload: connectionsToLoad,
});
