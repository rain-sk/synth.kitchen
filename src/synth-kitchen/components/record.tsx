import React, { useCallback, useRef, useState } from 'react';
import {
	IMediaRecorder,
	MediaRecorder,
	register
} from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';

import { audioContext, resampling } from '../audio/context';
import { useEffectOnce } from '../hooks/use-effect-once';
import { useStateContext } from '../hooks/use-state-context';

export const Record: React.FC = () => {
	const state = useStateContext();
	const mediaRecorder = useRef<IMediaRecorder>();
	const chunks = useRef<Blob[]>();
	const [recording, setRecording] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffectOnce(() => {
		(async () => {
			await register(await connect());
			setLoaded(true);
		})();
	});

	const handleRecord = useCallback(() => {
		setRecording(true);
		const streamDestination = audioContext.createMediaStreamDestination();
		mediaRecorder.current = new MediaRecorder(streamDestination.stream, {
			mimeType: 'audio/wav'
		});
		chunks.current = [];
		mediaRecorder.current.ondataavailable = (chunk: BlobEvent) => {
			chunks.current?.push(chunk.data);
		};
		resampling.connect(streamDestination);
		mediaRecorder.current.start();
	}, [recording, setRecording]);

	const handleStop = useCallback(() => {
		if (mediaRecorder.current) {
			setRecording(false);
			mediaRecorder.current.onstop = () => {
				const blob = new Blob(chunks.current, {
					type: 'audio/wav'
				});
				chunks.current = undefined;

				const tempAnchor = document.createElement('a');
				tempAnchor.setAttribute('href', URL.createObjectURL(blob));
				tempAnchor.setAttribute('download', `${state.name}.wav`);
				tempAnchor.click();

				mediaRecorder.current = undefined;
			};
			mediaRecorder.current.stop();
		}
	}, [recording, setRecording]);

	return loaded ? (
		<button type="button" onClick={recording ? handleStop : handleRecord}>
			{recording ? 'stop recording' : 'record'}
		</button>
	) : null;
};
