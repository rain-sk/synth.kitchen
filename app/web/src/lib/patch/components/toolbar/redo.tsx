import { useCallback, useContext } from 'react';

import { PatchContext } from '../../contexts/patch';
import { RedoSvg } from './svg/redo';
import { patchActions } from '../../state/actions';

export const Redo = () => {
	const { dispatch, historyPointer } = useContext(PatchContext);

	const disabled = historyPointer <= 0;

	const onRedo = useCallback(() => {
		dispatch(patchActions.redoAction());
	}, [dispatch]);

	return (
		<button type="button" id="redo" disabled={disabled} onClick={onRedo}>
			<span className="visually-hidden">redo</span>
			<RedoSvg />
		</button>
	);
};
