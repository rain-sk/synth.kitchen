import React, { useCallback, useEffect, useRef } from 'react';

import { Key } from '../../constants/key';

const onKeyDown = (init: () => void) => (e: KeyboardEvent) => {
	const key = e.key.toLowerCase();
	if (key === Key.ENTER || key === Key.SPACE) {
		e.stopPropagation();
		e.preventDefault();
		init();
	}
};

export const Init: React.FC<{
	loading: boolean;
	name: string;
	status: string;
	init: () => void;
	askWithoutMidi?: boolean;
	startWithoutMidi?: () => void;
}> = ({ loading, name, status, init, askWithoutMidi, startWithoutMidi }) => {
	const handleKeyDown = useRef(onKeyDown(init));

	useEffect(() => {
		if (!loading) {
			return;
		}

		document.addEventListener('keydown', handleKeyDown.current);

		return () => {
			document.removeEventListener('keydown', handleKeyDown.current);
		};
	}, [loading]);

	const onClickStart = useCallback(() => {
		init();
	}, [init]);

	return (
		<main id="init">
			{loading ? (
				<h1>loading...</h1>
			) : (
				<>
					<h1>patch/{name ? name : 'untitled'}</h1>
					{askWithoutMidi ? (
						<button
							type="button"
							id="start-without-midi"
							onClick={startWithoutMidi}
							autoFocus
						>
							start without MIDI
						</button>
					) : (
						<button
							type="button"
							id="start"
							onClick={onClickStart}
							autoFocus
					>
							start
						</button>
					)}
					<p>{status}</p>
				</>
			)}
		</main>
	);
};
