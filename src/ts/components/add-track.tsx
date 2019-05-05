import * as React from 'react';
import { KitchenStore } from '../flux';
import { moduleAddTrack } from '../flux/actions/module';
import { useFlux } from 'use-flux';

export const AddTrack: React.FunctionComponent = () => {
	const addTrack = useFlux(KitchenStore, ({ dispatch }) => () => {
		dispatch(moduleAddTrack());
	});

	return (
		<li>
			<button type="button" onClick={addTrack}>ADD TRACK</button>
		</li>
	)
}