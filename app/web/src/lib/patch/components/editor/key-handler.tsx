import React, { useCallback, useContext, useEffect } from 'react';

import { keyMovementMap } from '../../constants/key';
import { patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';

export const KeyHandler: React.FC = () => {
	const { selectedModules, dispatch } = useContext(PatchContext);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			const key = e.key.toLowerCase();
			if ((key === 'a' || key === 'z') && (e.ctrlKey || e.metaKey)) {
				if (
					!document.activeElement ||
					document.activeElement.nodeName !== 'INPUT'
				) {
					e.preventDefault();

					dispatch(patchActions.keyDownAction(key));
				}
				return;
			}

			const handleMovement = key in keyMovementMap && selectedModules.size > 0;

			if (handleMovement) {
				e.preventDefault();
			}

			dispatch(patchActions.keyDownAction(key));
		},
		[selectedModules, dispatch],
	);

	const onKeyUp = useCallback(
		(e: KeyboardEvent) => {
			dispatch(patchActions.keyUpAction(e.key.toLowerCase()));
		},
		[dispatch],
	);

	useEffect(() => {
		document.body.addEventListener('keydown', onKeyDown, false);
		document.body.addEventListener('keyup', onKeyUp, false);

		return () => {
			document.body.removeEventListener('keydown', onKeyDown, false);
			document.body.removeEventListener('keyup', onKeyUp, false);
		};
	}, [onKeyDown, onKeyUp]);

	return null;
};
