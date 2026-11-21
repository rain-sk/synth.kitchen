import React, { useMemo } from 'react';
import { ConnectionsState, IoType } from 'synth.kitchen-shared';

import { connectorKey } from '../state/connection';import { ConnectorInfo } from '../state/types/patch';

type DerivedConnectionState = {
	activeConnectorIsInput: boolean;
	activeConnectorIsOutput: boolean;
	connectedToActiveConnector: Set<string>;
	// every connector currently carrying a cable, on either end. the drag-time
	// connectedToActiveConnector above cannot answer that — it only knows about the
	// connector the user is holding, so a socket that is plugged in but not part of
	// the active drag looks identical to a free one
	pluggedConnectorKeys: Set<string>;
};
/**
 * Should this connector be quiet — painted small while keeping its full hit target?
 *
 * The rule is directional: the connector you are holding decides what is relevant.
 * Same direction as the active connector means it cannot take this cable, so it gets
 * small; the opposite direction is where the cable can land, so it stays prominent and
 * is highlighted. With nothing active, outputs stay prominent as the place to start and
 * only empty inputs recede — an input carrying a cable is still worth seeing.
 *
 * The active connector itself is never quiet, and :hover is exempt in the stylesheet,
 * where the halo shows the clickable area is still the full box.
 */
export const isQuietConnector = (
	direction: 'input' | 'output',
	options: {
		isActive: boolean;
		isPlugged: boolean;
		activeConnectorIsInput: boolean;
		activeConnectorIsOutput: boolean;
	},
): boolean => {
	if (options.isActive) {
		return false;
	}
	if (options.activeConnectorIsOutput) {
		return direction === 'output';
	}
	if (options.activeConnectorIsInput) {
		return direction === 'input';
	}
	return direction === 'input' && !options.isPlugged;
};

export const DerivedConnectionStateContext =
	React.createContext<DerivedConnectionState>({
		activeConnectorIsInput: false,
		activeConnectorIsOutput: false,
		connectedToActiveConnector: new Set<string>(),
		pluggedConnectorKeys: new Set<string>(),
	});

export const DerivedConnectionStateContextProvider: React.FC<
	React.PropsWithChildren<{
		activeConnectorKey?: string;
		connections: ConnectionsState;
		connectors: Record<string, ConnectorInfo>;
	}>
> = ({ children, activeConnectorKey, connections, connectors }) => {
	const [activeConnector, activeConnectorConnections] = useMemo(
		(): ConnectorInfo | [undefined, string[]] =>
			(activeConnectorKey && connectors[activeConnectorKey]) || [undefined, []],
		[activeConnectorKey, connectors],
	);

	const { activeConnectorIsInput, activeConnectorIsOutput } = useMemo(() => {
		if (activeConnector) {
			const activeConnectorIsOutput =
				activeConnector &&
				'type' in activeConnector &&
				activeConnector.type === IoType.output;

			return {
				activeConnectorIsInput: !activeConnectorIsOutput,
				activeConnectorIsOutput,
			};
		} else {
			return {
				activeConnectorIsInput: false,
				activeConnectorIsOutput: false,
			};
		}
	}, [activeConnector]);

	const pluggedConnectorKeys = useMemo(() => {
		const plugged = new Set<string>();
		for (const [output, input] of Object.values(connections.state)) {
			plugged.add(connectorKey(output));
			plugged.add(connectorKey(input));
		}
		return plugged;
	}, [connections]);

	const connectedToActiveConnector = useMemo(() => {
		if (!activeConnectorKey) {
			return new Set<string>();
		}
		const connected = new Set<string>();
		for (const key of activeConnectorConnections) {
			const connection = connections.state[key];
			if (!connection) {
				continue;
			}
			const [output, input] = connection;
			connected.add(
				activeConnectorIsOutput ? connectorKey(input) : connectorKey(output),
			);
		}
		return connected;
	}, [
		activeConnectorKey,
		activeConnectorConnections,
		activeConnectorIsOutput,
		connections,
	]);

	return (
		<DerivedConnectionStateContext.Provider
			value={{
				activeConnectorIsInput,
				activeConnectorIsOutput,
				connectedToActiveConnector,
				pluggedConnectorKeys,
			}}
		>
			{children}
		</DerivedConnectionStateContext.Provider>
	);
};
