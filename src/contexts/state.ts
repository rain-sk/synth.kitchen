import React from 'react';
import { initialState, IPatchState } from '../state/types/state';

export const StateContext = React.createContext<IPatchState>(initialState);
