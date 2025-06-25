import React, { useCallback, useContext, useEffect } from 'react';

import { KeyCode, keyCodeMovementMap } from '../../constants/key';
import { recipeActions } from '../../state/actions';
import { RecipeContext } from '../../contexts/recipe';

export const KeyHandler: React.FC = () => {
	const { selectedModuleKeys, dispatch } = useContext(RecipeContext);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.keyCode === KeyCode.A) {
				if (
					!document.activeElement ||
					document.activeElement.nodeName !== 'INPUT'
				) {
					e.preventDefault();

					dispatch(recipeActions.keyDownAction(e.keyCode));
				}
				return;
			}

			const handleMovement =
				e.keyCode in keyCodeMovementMap && selectedModuleKeys.size > 0;

			if (handleMovement) {
				e.preventDefault();
			}

			dispatch(recipeActions.keyDownAction(e.keyCode));
		},
		[selectedModuleKeys, dispatch],
	);

	const onKeyUp = useCallback(
		(e: KeyboardEvent) => {
			dispatch(recipeActions.keyUpAction(e.keyCode));
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
