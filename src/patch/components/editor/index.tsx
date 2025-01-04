import React, { useReducer } from 'react';

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
import { IConnectorInfo, IInput, IOutput } from '../../state/types/connection';
import { connectorKey } from '../../state/connection';

const useLoadConnections = (
	dispatch: React.Dispatch<IPatchAction>,
	connectors: Record<string, IConnectorInfo>,
	connectionsToLoad?: Record<string, [IOutput, IInput]>,
) => {
	if (connectionsToLoad) {
		const connectedConnectors = new Set<string>();
		Object.values(connectionsToLoad).forEach(([output, input]) => {
			connectedConnectors.add(connectorKey(output));
			connectedConnectors.add(connectorKey(input));
		});

		if (
			connectedConnectors.size > 0 &&
			[...connectedConnectors].every((key) => key in connectors)
		) {
			dispatch(patchActions.loadConnectionsAction(connectionsToLoad));
		}
	}
};

export const PatchEditor: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, blankPatch());

	useLoadConnections(dispatch, state.connectors, state.connectionsToLoad);

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
