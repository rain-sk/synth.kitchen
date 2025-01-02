import React from 'react';
import { blankPatch, IPatchState } from '../state/types/state';
import { IPatchAction } from '../state/actions';

export const PatchContext = React.createContext<
	IPatchState & {
		dispatch: React.Dispatch<IPatchAction>;
	}
>({
	...blankPatch(),
	dispatch: () => {},
});
