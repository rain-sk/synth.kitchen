import React, { useReducer } from 'react';
import { ResizableCanvas } from './components/resizable-canvas';
import { KeyHandler } from './components/key-handler';
import { Module } from './modules/module';
import { DispatchContext, reducer, StateContext } from './state';
import { initialState } from './state/types/state';

export const Kitchen: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<ResizableCanvas drawOnTop={false}>
					<KeyHandler />
				</ResizableCanvas>
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
};
