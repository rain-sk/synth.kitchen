import React from 'react';
import { IPatchState } from '../state/types/patch';
import { IPatchAction } from '../state/actions';
import { blankPatch } from '../state';

type PatchContextValue = IPatchState & {
	dispatch: React.Dispatch<IPatchAction>;
};

export const PatchContext = React.createContext<PatchContextValue>({
	...blankPatch(),
	dispatch: () => {},
});

export const PatchContextProvider: React.FC<
	React.PropsWithChildren<PatchContextValue>
> = (props) => {
	return (
		<PatchContext.Provider value={props}>
			{props.children}
		</PatchContext.Provider>
	);
};
