import React, { useReducer } from 'react';
import { ResizableCanvas } from './components/resizable-canvas';
import { KeyHandler } from './components/key-handler';
import { ModuleCanvas } from './components/module-canvas';
import { reducer } from './state';
import { IState, initialState } from './state/types/state';
import { Toolbar } from './components/toolbar';
import { StateContext } from './contexts/state';
import { DispatchContext } from './contexts/dispatch';
import { ConnectionContextProvider } from './contexts/connection';
import { IAction } from './state/actions';

const ContextWrapper: React.FC<
	React.PropsWithChildren<{ state: IState; dispatch: React.Dispatch<IAction> }>
> = ({ children, state, dispatch }) => {
	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<ConnectionContextProvider>{children}</ConnectionContextProvider>
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
};

export const Kitchen: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<ContextWrapper state={state} dispatch={dispatch}>
			<Toolbar />
			<ResizableCanvas drawOnTop={false}>
				<KeyHandler />
				<ModuleCanvas modules={state.modules} />
			</ResizableCanvas>
		</ContextWrapper>
	);
};
