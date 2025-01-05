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
import { connectorButton, connectorKey } from '../../state/connection';
import { IConnectorInfo, IInput, IOutput } from '../../state/types/connection';

const useLoadConnections = ({
	connectionsToLoad,
	connectors,
	dispatch,
}: {
	connectionsToLoad?: Record<string, [IOutput, IInput]>;
	connectors: Record<string, IConnectorInfo>;
	dispatch: React.Dispatch<IPatchAction>;
}) => {
	useEffect(() => {
		if (connectionsToLoad) {
			const connectedConnectors = new Set<string>();
			Object.values(connectionsToLoad).forEach(([output, input]) => {
				connectedConnectors.add(connectorKey(output));
				connectedConnectors.add(connectorKey(input));
			});

			if (
				connectedConnectors.size > 0 &&
				[...connectedConnectors].every(
					(key) => key in connectors && connectorButton(key),
				)
			) {
				dispatch(patchActions.loadConnectionsAction(connectionsToLoad));
			}
		}
	}, [connectionsToLoad, connectors]);
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
