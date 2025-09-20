import { useReducer } from 'react';
import React from 'react';
import { PatchEditor } from '../../lib/patch/components/editor';
import { PatchContextProvider } from '../../lib/patch/contexts/patch';
import { blankPatch } from '../../lib/patch/state';
import { patchReducer } from '../../lib/patch/state';

const initialState = { ...blankPatch() };

export const PatchRoot: React.FC<{ slug?: string }> = ({ slug }) => {
	const [state, dispatch] = useReducer(patchReducer, initialState);

	return (
		<PatchContextProvider {...state} dispatch={dispatch}>
			<PatchEditor slug={slug} />
		</PatchContextProvider>
	);
};