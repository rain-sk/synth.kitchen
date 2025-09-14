import React, { useReducer } from 'react';
import { blankPatch, patchReducer } from '../../lib/patch/state';
import { PatchContextProvider } from '../../lib/patch/contexts/patch';
import { PatchEditor } from '../../lib/patch/components/editor';

const initialState = { ...blankPatch() };
export const PatchRoot: React.FC<{ slug?: string }> = ({ slug }) => {
	const [state, dispatch] = useReducer(patchReducer, initialState);

	return (
		<PatchContextProvider {...state} dispatch={dispatch}>
			<PatchEditor slug={slug} />
		</PatchContextProvider>
	);
};
