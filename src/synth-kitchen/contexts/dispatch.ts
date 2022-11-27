import React from 'react';
import { IAction } from '../state/actions';

export const DispatchContext = React.createContext<React.Dispatch<IAction>>(
	() => {}
);
