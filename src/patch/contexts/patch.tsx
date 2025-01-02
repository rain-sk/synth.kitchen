import React from 'react';
import { blankPatch, IPatchState } from '../state/types/patch';
import { IPatchAction } from '../state/actions';

type PatchContextValue = IPatchState & {
	dispatch: React.Dispatch<IPatchAction>;
};

export const PatchContext = React.createContext<PatchContextValue>({
	...blankPatch(),
	dispatch: () => {},
});

export const PatchContextProvider: React.FC<
	React.PropsWithChildren<PatchContextValue>
> = (props) => (
	<PatchContext.Provider value={props}>{props.children}</PatchContext.Provider>
);
