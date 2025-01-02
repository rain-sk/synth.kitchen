import React, { useReducer } from 'react';
import { reducer } from './patch/state';
import { blankPatch, IPatchState } from './patch/state/types/patch';
import { ConnectionContextProvider } from './patch/contexts/connection';
import { IPatchAction } from './patch/state/actions';
import { MidiContextProvider } from './patch/contexts/midi';
import { Toolbar } from './patch/components/toolbar';
import { PatchEditor } from './patch/components/editor/patch-editor';
import { PatchLoader } from './patch/components/editor/patch-loader';
import { PatchContext } from './patch/contexts/patch';

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
