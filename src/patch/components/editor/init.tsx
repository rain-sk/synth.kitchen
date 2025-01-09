import React, { useCallback, useState } from 'react';

export const Init: React.FC<{
	name: string;
	status: string;
	init: () => void;
}> = ({ name, status, init }) => {
	const [buttonClicked, setButtonClicked] = useState(false);

	const onClickStart = useCallback(() => {
		if (buttonClicked) {
			return;
		}
		setButtonClicked(true);
		init();
	}, [init, setButtonClicked]);
	return (
		<main id="init">
			<h1>Patch: {name}</h1>
			<button disabled={buttonClicked} type="button" onClick={onClickStart}>
				start
			</button>
			<p>{status}</p>
		</main>
	);
};
