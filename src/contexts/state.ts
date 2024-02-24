import React from 'react';
import { initialState, IState } from '../state/types/state';

export const StateContext = React.createContext<IState>(initialState);
