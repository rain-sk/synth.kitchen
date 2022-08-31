import React from 'react'
import { Module } from './module';
import { initialState, reducer } from './state';

export const Kitchen: React.FC = () => {
    const [state] = React.useReducer(reducer, initialState);

    return <>{Object.keys(state.modules).map((key) => <Module key={key} moduleKey={key} />)}</>
};