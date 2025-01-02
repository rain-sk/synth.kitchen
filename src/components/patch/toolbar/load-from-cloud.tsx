import React, { useCallback } from 'react';
import { OpenFromCloudSvg } from './svg';
import { useDispatchContext } from '../../../hooks/use-dispatch-context';
import { patchActions } from '../../../state/actions';

export const LoadFromCloud: React.FC = () => {
	const dispatch = useDispatchContext();

	const onLoad = useCallback(() => {
		dispatch(patchActions.loadFromCloudAction());
	}, [dispatch]);

	return (
		<button type="button" onClick={onLoad}>
			<span className="visually-hidden">load from cloud</span>
			<OpenFromCloudSvg />
		</button>
	);
};
