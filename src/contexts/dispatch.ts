import React from 'react';
import { IPatchAction } from '../state/actions';

export const DispatchContext = React.createContext<
	React.Dispatch<IPatchAction>
>(() => {});
