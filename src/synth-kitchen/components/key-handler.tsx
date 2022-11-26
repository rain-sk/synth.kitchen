import React, { useEffect, useRef } from 'react';
import { useDispatchContext } from '../state';
import { actions } from '../state/actions';

export const KeyHandler: React.FC = () => {
	const dispatch = useDispatchContext();

	const { current: onKeyDown } = useRef((e: KeyboardEvent) => {
		dispatch(actions.keyDownAction(e.keyCode));
	});

	const { current: onKeyUp } = useRef((e: KeyboardEvent) => {
		dispatch(actions.keyUpAction(e.keyCode));
	});

	useEffect(() => {
		document.body.addEventListener('keydown', onKeyDown, false);
		document.body.addEventListener('keyup', onKeyUp, false);

		return () => {
			document.body.removeEventListener('keydown', onKeyDown, false);
			document.body.removeEventListener('keyup', onKeyUp, false);
		};
	}, []);

	return null;
};
