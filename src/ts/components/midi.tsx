import * as React from 'react';
import * as WebMidi from 'webmidi';

import { KitchenContext } from '../flux';
import { midiPlayNote, midiStopNote, midiInitialize } from '../flux/actions';


export const MidiService: React.FunctionComponent = () => {
	const { state, dispatch } = React.useContext(KitchenContext);
	React.useEffect(() => {
		if (!state.initialized) {
			WebMidi.enable(function (err) {
				if (!!err) {
					console.error(err);
				} else {
					console.log('Midi Enabled!');
					WebMidi.inputs[0].addListener('noteon', 'all',
						function (e) {
							dispatch(midiPlayNote(e.data[1]));
						});
					WebMidi.inputs[0].addListener('noteoff', 'all',
						function (e) {
							dispatch(midiStopNote(e.data[1]));
						});
					dispatch(midiInitialize());
				}
			});
		}
	});
	return null;
};