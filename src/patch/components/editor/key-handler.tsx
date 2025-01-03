import React, { useContext, useEffect, useRef } from 'react';

import { KeyCode, keyCodeMovementMap } from '../../../constants/key';
import { patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';

export const KeyHandler: React.FC = () => {
	const { selectedModuleKeys, dispatch } = useContext(PatchContext);

	const { current: onKeyDown } = useRef((e: KeyboardEvent) => {
		if (e.keyCode === KeyCode.A) {
			if (
				!document.activeElement ||
				document.activeElement.nodeName !== 'INPUT'
			) {
				e.preventDefault();

				dispatch(patchActions.keyDownAction(e.keyCode));
			}
			return;
		}

		const handleMovement =
			e.keyCode in keyCodeMovementMap && selectedModuleKeys.size > 0;

		if (handleMovement) {
			e.preventDefault();
		}

		dispatch(patchActions.keyDownAction(e.keyCode));
	});

	const { current: onKeyUp } = useRef((e: KeyboardEvent) => {
		dispatch(patchActions.keyUpAction(e.keyCode));
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
