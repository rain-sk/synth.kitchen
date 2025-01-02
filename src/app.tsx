import React, { useReducer } from 'react';
import { reducer } from './state';
import { blankPatch, IPatchState } from './state/types/state';
import { ConnectionContextProvider } from './contexts/connection';
import { IPatchAction } from './state/actions';
import { MidiContextProvider } from './contexts/midi';
import { Toolbar } from './components/patch/toolbar';
import { PatchEditor } from './components/patch/editor/patch-editor';
import { PatchLoader } from './components/patch/editor/patch-loader';
import { PatchContext } from './contexts/patch';

const ContextWrapper: React.FC<
	React.PropsWithChildren<{
		state: IPatchState;
		dispatch: React.Dispatch<IPatchAction>;
	}>
> = ({ children, state, dispatch }) => {
	return (
		<PatchContext.Provider value={{ ...state, dispatch }}>
			<ConnectionContextProvider>
				<MidiContextProvider>{children}</MidiContextProvider>
			</ConnectionContextProvider>
		</PatchContext.Provider>
	);
};

export const SynthKitchen: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, blankPatch());
	return (
		<ContextWrapper state={state} dispatch={dispatch}>
			<Toolbar />
			<PatchEditor />
			<PatchLoader />
		</ContextWrapper>
	);
};
