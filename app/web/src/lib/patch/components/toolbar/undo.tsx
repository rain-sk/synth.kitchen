import { useCallback, useContext } from 'react';

import { PatchContext } from '../../contexts/patch';
import { UndoSvg } from './svg/undo';
import { patchActions } from '../../state/actions';

export const Undo = () => {
	const { dispatch, history, historyPointer } = useContext(PatchContext);

	const disabled = historyPointer + 1 >= history.length;

	const onUndo = useCallback(() => {
		dispatch(patchActions.undoAction());
	}, [dispatch]);

	return (
		<button type="button" id="undo" disabled={disabled} onClick={onUndo}>
			<span className="visually-hidden">undo</span>
			<UndoSvg />
		</button>
	);
};
