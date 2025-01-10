import React, { useReducer } from 'react';

import { blankPatch } from '../../state';
import { DerivedConnectionStateContextProvider } from '../../contexts/derived-connection-state';
import { MidiContextProvider } from '../../contexts/midi';
import { ModuleCanvas } from './module-canvas';
import { PatchContextProvider } from '../../contexts/patch';
import { PatchLoader } from './patch-loader';
import { reducer } from '../../state/reducers';
import { Toolbar } from '../toolbar';
import { useLoadConnections } from './use-load-connections';
import { useAudioMidiInit } from './use-audio-midi-init';
import { Init } from './init';
import { useTitle } from 'react-use';
import { useEditorComponentProps } from './use-editor-component-props';
import { useLoadPatch } from './use-load-patch';

export const PatchEditor: React.FC<{ id?: string }> = ({ id }) => {
	const { initialized, status, init } = useAudioMidiInit();
	const [state, dispatch] = useReducer(reducer, blankPatch());
	useTitle(`patch/${state.name}`);

	useLoadPatch(dispatch, id);

	useLoadConnections({ ...state, dispatch, initialized });

	const { connectionsProps, moduleCanvasBackdropProps, moduleProps } =
		useEditorComponentProps(state, dispatch);

	return (
		<PatchContextProvider {...state} dispatch={dispatch}>
			<DerivedConnectionStateContextProvider {...state}>
				<MidiContextProvider>
					<Toolbar />
					{initialized ? (
						<ModuleCanvas
							connectionsProps={connectionsProps}
							moduleCanvasBackdropProps={moduleCanvasBackdropProps}
							moduleProps={moduleProps}
							modulePositions={state.modulePositions}
							modules={state.modules}
							dispatch={dispatch}
						/>
					) : (
						<Init name={state.name} status={status} init={init} />
					)}
					<PatchLoader />
				</MidiContextProvider>
			</DerivedConnectionStateContextProvider>
		</PatchContextProvider>
	);
};
