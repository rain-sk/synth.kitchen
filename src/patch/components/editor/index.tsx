import React, { useEffect, useReducer } from 'react';

import { blankPatch } from '../../state';
import { DerivedConnectionStateContextProvider } from '../../contexts/derived-connection-state';
import { Connections } from './connections';
import { KeyHandler } from './key-handler';
import { MidiContextProvider } from '../../contexts/midi';
import { ModuleCanvas } from './module-canvas';
import { ModuleCanvasBackdrop } from './module-canvas-backdrop';
import { PatchContextProvider } from '../../contexts/patch';
import { PatchLoader } from './patch-loader';
import { reducer } from '../../state/reducers';
import { Toolbar } from '../toolbar';
import { IPatchAction, patchActions } from '../../state/actions';
import { connectorButtonExists, connectorKey } from '../../state/connection';
import { IConnectorInfo, IInput, IOutput } from '../../state/types/connection';

const doLoadConnections = (
	connectedConnectors: Set<string>,
	dispatch: React.Dispatch<IPatchAction>,
) => {
	const connectorButtonsExist = [...connectedConnectors].every((key) =>
		connectorButtonExists(key),
	);
	if (connectorButtonsExist) {
		dispatch(patchActions.loadConnectionsAction());
	} else {
		console.log('delay load connections');
		setTimeout(() => doLoadConnections(connectedConnectors, dispatch), 17);
	}
};

const useLoadConnections = ({
	loadConnections,
	connections,
	connectors,
	dispatch,
}: {
	loadConnections: boolean;
	connections: Record<string, [IOutput, IInput]>;
	connectors: Record<string, IConnectorInfo>;
	dispatch: React.Dispatch<IPatchAction>;
}) => {
	useEffect(() => {
		if (loadConnections) {
			const connectedConnectors = new Set<string>();
			Object.values(connections).forEach(([output, input]) => {
				connectedConnectors.add(connectorKey(output));
				connectedConnectors.add(connectorKey(input));
			});
			if (
				connectedConnectors.size > 0 &&
				[...connectedConnectors].every((key) => key in connectors)
			) {
				doLoadConnections(connectedConnectors, dispatch);
			}
		}
	}, [loadConnections, connections, connectors]);
};

export const PatchEditor: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, blankPatch());

	useLoadConnections({ ...state, dispatch });

	return (
		<PatchContextProvider {...state} dispatch={dispatch}>
			<DerivedConnectionStateContextProvider {...state}>
				<MidiContextProvider>
					<Toolbar />
					<ModuleCanvasBackdrop>
						<KeyHandler />
						<ModuleCanvas />
						<Connections />
					</ModuleCanvasBackdrop>
					<PatchLoader />
				</MidiContextProvider>
			</DerivedConnectionStateContextProvider>
		</PatchContextProvider>
	);
};
