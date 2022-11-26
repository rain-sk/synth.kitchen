import React, { useReducer } from 'react';
import { Canvas } from './components/canvas';
import { KeyHandler } from './components/key-handler';
import { Module } from './modules/module';
import { DispatchContext, reducer, StateContext } from './state';
import { initialState } from './state/types/state';

export const Kitchen: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<Canvas>
					<KeyHandler />
					{Object.values(state.modules).map((module) => (
						<Module key={module.moduleKey} module={module} />
					))}
				</Canvas>
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
};
