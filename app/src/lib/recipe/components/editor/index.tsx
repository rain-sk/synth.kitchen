import React, { useReducer } from 'react';

import { blankRecipe, blankRecipeToLoad } from '../../state';
import { DerivedConnectionStateContextProvider } from '../../contexts/derived-connection-state';
import { MidiContextProvider } from '../../contexts/midi';
import { ModuleCanvas } from './module-canvas';
import { RecipeContextProvider } from '../../contexts/recipe';
import { reducer } from '../../state/reducers';
import { Toolbar } from '../toolbar';
import { useAudioMidiInit } from './use-audio-midi-init';
import { Init } from './init';
import { useTitle } from 'react-use';
import { useLoadRecipe } from './use-load-recipe';

const initialState = { ...blankRecipe(), ...blankRecipeToLoad() };

export const RecipeEditor: React.FC<{ id?: string }> = ({ id }) => {
	const { initialized, status, init } = useAudioMidiInit();
	const [state, dispatch] = useReducer(reducer, {
		...initialState,
		id: id ? id : initialState.id,
	});

	useTitle(`recipe/${state.name}`);

	useLoadRecipe(state, dispatch, id);

	return (
		<RecipeContextProvider {...state} dispatch={dispatch}>
			<DerivedConnectionStateContextProvider {...state}>
				<MidiContextProvider>
					<Toolbar />
					{initialized ? (
						<ModuleCanvas state={state} dispatch={dispatch} />
					) : (
						<Init
							loading={!id || id !== state.id}
							name={id && id !== state.id ? '' : state.name}
							status={status}
							init={init}
						/>
					)}
				</MidiContextProvider>
			</DerivedConnectionStateContextProvider>
		</RecipeContextProvider>
	);
};
