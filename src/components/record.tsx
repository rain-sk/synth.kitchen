import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	IMediaRecorder,
	MediaRecorder,
	register
} from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';
import hhmmss from 'hhmmss';

import { audioContext, resampling } from '../audio/context';
import { useEffectOnce } from '../hooks/use-effect-once';
import { useStateContext } from '../hooks/use-state-context';

export const Record: React.FC = () => {
	const state = useStateContext();
	const mediaRecorder = useRef<IMediaRecorder>();
	const chunks = useRef<Blob[]>();

	const [loaded, setLoaded] = useState(false);
	const [recording, setRecording] = useState(false);

	const recordingStartTimeRef = useRef(0);
	const [recordingTime, setRecordingTime] = useState(0);

	useEffectOnce(() => {
		(async () => {
			await register(await connect());
			setLoaded(true);
		})();
	});

	let timerCallback: any;
	timerCallback = useCallback(() => {
		setRecordingTime(audioContext.currentTime - recordingStartTimeRef.current);
		if (recording) {
			setTimeout(timerCallback, 500);
		}
	}, [recording]);

	useEffect(() => {
		if (recording) {
			timerCallback();
		}
	}, [recording]);

	const handleRecord = useCallback(() => {
		setRecording(true);
		recordingStartTimeRef.current = audioContext.currentTime;
		const streamDestination = audioContext.createMediaStreamDestination();
		mediaRecorder.current = new MediaRecorder(streamDestination.stream, {
			mimeType: 'audio/wav'
		});
		chunks.current = [];
		mediaRecorder.current.ondataavailable = (chunk: BlobEvent) => {
			chunks.current?.push(chunk.data);
			setRecordingTime(
				audioContext.currentTime - recordingStartTimeRef.current
			);
		};
		resampling.connect(streamDestination);
		mediaRecorder.current.start();
	}, [recording, setRecording, recordingStartTimeRef, setRecordingTime]);

	const handleStop = useCallback(() => {
		if (mediaRecorder.current) {
			recordingStartTimeRef.current = 0;
			setRecording(false);
			setRecordingTime(0);
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
		<>
			<button type="button" onClick={recording ? handleStop : handleRecord}>
				{recording ? `stop (${hhmmss(recordingTime)})` : 'record'}
			</button>
		</>
	) : null;
};
