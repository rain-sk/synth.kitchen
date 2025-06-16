import React, { useCallback, useState } from 'react';

export const Init: React.FC<{
	loading: boolean;
	name: string;
	status: string;
	init: () => void;
}> = ({ loading, name, status, init }) => {
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
			{loading ? (
				<h1>loading...</h1>
			) : (
				<>
					<h1>patch/{name}</h1>
					<button
						disabled={buttonClicked}
						type="button"
						onClick={onClickStart}
						autoFocus
					>
						start
					</button>
					<p>{status}</p>
				</>
			)}
		</main>
	);
};
