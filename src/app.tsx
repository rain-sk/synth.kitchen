import React, { useReducer } from 'react';
import { reducer } from './state';
import { IState, initialState } from './state/types/state';
import { StateContext } from './contexts/state';
import { DispatchContext } from './contexts/dispatch';
import { ConnectionContextProvider } from './contexts/connection';
import { IAction } from './state/actions';
import { MidiContextProvider } from './contexts/midi';
import { Toolbar } from './components/patch/toolbar';
import { PatchEditor } from './components/patch/editor/patch-editor';
import { PatchLoader } from './components/patch/editor/patch-loader';

const ContextWrapper: React.FC<
	React.PropsWithChildren<{ state: IState; dispatch: React.Dispatch<IAction> }>
> = ({ children, state, dispatch }) => {
	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<ConnectionContextProvider>
					<MidiContextProvider>{children}</MidiContextProvider>
				</ConnectionContextProvider>
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
};

export const SynthKitchen: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<ContextWrapper state={state} dispatch={dispatch}>
			<Toolbar />
			<PatchEditor />
			<PatchLoader />
		</ContextWrapper>
	);
};
