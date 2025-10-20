import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { IMediaRecorder, MediaRecorder } from 'extendable-media-recorder';
import hhmmss from 'hhmmss';

import { audioContext, resampling } from '../../audio';
import { PatchContext } from '../../contexts/patch';
import { useRefBackedState } from '../../../shared/utils/use-ref-backed-state';

export const Record: React.FC = () => {
	const state = useContext(PatchContext);
	const mediaRecorder = useRef<IMediaRecorder>(undefined);
	const chunks = useRef<Blob[]>(undefined);

	const [recordingRef, recording, setRecording] = useRefBackedState(false);

	const recordingStartTimeRef = useRef(0);
	const [recordingTime, setRecordingTime] = useState(0);

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

	const handleUnload = useCallback((e: BeforeUnloadEvent) => {
		if (recordingRef.current) {
			const msg = 'You have an unsaved recording, do you really want to leave?';
			e.preventDefault();
			return msg;
		}
	}, []);

	const handleStop = useCallback(() => {
		if (mediaRecorder.current) {
			recordingStartTimeRef.current = 0;
			window.removeEventListener('beforeunload', handleUnload);
			setRecording(false);
			setRecordingTime(0);
			mediaRecorder.current.onstop = () => {
				const blob = new Blob(chunks.current, {
					type: 'audio/wav',
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
	}, []);

	const handleRecord = useCallback(() => {
		setRecording(true);
		window.addEventListener('beforeunload', handleUnload);
		recordingStartTimeRef.current = audioContext.currentTime;
		const streamDestination =
			audioContext.current.createMediaStreamDestination();
		mediaRecorder.current = new MediaRecorder(streamDestination.stream, {
			mimeType: 'audio/wav',
		});
		chunks.current = [];
		mediaRecorder.current.ondataavailable = (chunk: BlobEvent) => {
			chunks.current?.push(chunk.data);
			setRecordingTime(
				audioContext.currentTime - recordingStartTimeRef.current,
			);
		};
		resampling.current.connect(streamDestination);
		mediaRecorder.current.start();
	}, []);

	return (
		<button type="button" onClick={recording ? handleStop : handleRecord}>
			{recording ? `stop (${hhmmss(recordingTime)})` : 'record'}
		</button>
	);
};
