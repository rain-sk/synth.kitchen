import React from 'react';

import { blankPatch } from '../state';
import { IPatchAction } from '../state/actions';
import { IPatchState } from '../state/types/patch';

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
