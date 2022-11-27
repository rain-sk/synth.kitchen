import React, { useContext } from 'react';
import { IAction } from '../state/actions';

export const DispatchContext = React.createContext<React.Dispatch<IAction>>(
	() => {}
);

export const useDispatchContext = () => useContext(DispatchContext);
