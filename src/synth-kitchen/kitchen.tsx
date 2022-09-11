import React, { useReducer } from 'react';
import { Canvas } from './canvas';
import { Module } from './modules/module';
import { DispatchContext, reducer } from './state';
import { initialState } from './state/types/state';

export const Kitchen: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<Canvas dispatch={dispatch}>
			<DispatchContext.Provider value={dispatch}>
				{Object.values(state.modules).map((module) => (
					<Module key={module.moduleKey} module={module} />
				))}
			</DispatchContext.Provider>
		</Canvas>
	);
};
