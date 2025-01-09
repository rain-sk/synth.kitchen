import React, { useMemo, useReducer } from 'react';

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
import { useLoadConnections } from './use-load-connections';
import { useAudioMidiInit } from './use-audio-midi-init';
import { Init } from './init';

export const PatchEditor: React.FC = () => {
	const { initialized, status, init } = useAudioMidiInit();

	const [state, dispatch] = useReducer(reducer, blankPatch());

	useLoadConnections({ ...state, dispatch, initialized });

	const moduleCanvasBackdropProps = useMemo(
		() => ({
			dispatch,
			modulePositions: state.modulePositions,
			modules: state.modules,
			selectedModuleKeys: state.selectedModuleKeys,
		}),
		[dispatch, state.modulePositions, state.modules, state.selectedModuleKeys],
	);

	const moduleCanvasProps = useMemo(
		() => ({
			dispatch,
			heldModifiers: state.heldModifiers,
			modulePositions: state.modulePositions,
			modules: state.modules,
			selectedModuleKeys: state.selectedModuleKeys,
			selectionPending: state.selectionPending,
		}),
		[
			dispatch,
			state.heldModifiers,
			state.modulePositions,
			state.modules,
			state.selectedModuleKeys,
			state.selectionPending,
		],
	);

	const connectionsProps = useMemo(
		() => ({
			activeConnectorKey: state.activeConnectorKey,
			modules: state.modules,
			modulePositions: state.modulePositions,
			connections: state.connections,
			connectors: state.connectors,
		}),
		[
			state.activeConnectorKey,
			state.modules,
			state.modulePositions,
			state.connections,
			state.connectors,
		],
	);

	return (
		<PatchContextProvider {...state} dispatch={dispatch}>
			<DerivedConnectionStateContextProvider {...state}>
				<MidiContextProvider>
					<Toolbar />
					{initialized ? (
						<ModuleCanvasBackdrop {...moduleCanvasBackdropProps}>
							<KeyHandler />
							<ModuleCanvas {...moduleCanvasProps} />
							<Connections {...connectionsProps} />
						</ModuleCanvasBackdrop>
					) : (
						<Init name={state.name} status={status} init={init} />
					)}
					<PatchLoader />
				</MidiContextProvider>
			</DerivedConnectionStateContextProvider>
		</PatchContextProvider>
	);
};
