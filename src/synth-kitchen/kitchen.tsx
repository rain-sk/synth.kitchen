import React from 'react'
import { Module } from './modules/module';
import { DispatchContext, initialState, reducer } from './state';

export const Kitchen: React.FC = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <DispatchContext.Provider value={dispatch}>
            {Object.values(state.modules).map((module) => (
                <Module key={module.moduleKey} module={module} />
            ))}
        </DispatchContext.Provider>
    )
};