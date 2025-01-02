import React, { useCallback } from 'react';
import { OpenFromCloudSvg } from './svg';
import { patchActions } from '../../state/actions';
import { usePatch } from '../../../hooks/use-patch';

export const LoadFromCloud: React.FC = () => {
	const { dispatch } = usePatch();

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
