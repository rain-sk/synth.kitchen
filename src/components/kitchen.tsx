import React, { useMemo, useReducer } from 'react';
import { ModuleCanvasBackdrop } from './module-canvas-backdrop';
import { KeyHandler } from './key-handler';
import { ModuleCanvas } from './module-canvas';
import { reducer } from '../state';
import { IState, initialState } from '../state/types/state';
import { Toolbar } from './toolbar';
import { StateContext } from '../contexts/state';
import { DispatchContext } from '../contexts/dispatch';
import { ConnectionContextProvider } from '../contexts/connection';
import { IAction } from '../state/actions';
import { Connections } from './connections';
import { MidiContextProvider } from '../contexts/midi';

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

export const Kitchen: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const sortedModules = useMemo(
		() =>
			Object.entries(state.modulePositions)
				.sort(
					([, [ax, ay]], [, [bx, by]]) =>
						Math.sqrt(Math.pow(ax, 2) + Math.pow(ay, 2)) -
						Math.sqrt(Math.pow(bx, 2) + Math.pow(by, 2))
				)
				.map(([moduleKey]) => state.modules[moduleKey]),
		[state.modulePositions]
	);

	return (
		<ContextWrapper state={state} dispatch={dispatch}>
			<Toolbar />
			<ModuleCanvasBackdrop drawOnTop={false}>
				<KeyHandler />
				<ModuleCanvas modules={sortedModules} />
				<Connections />
			</ModuleCanvasBackdrop>
		</ContextWrapper>
	);
};
