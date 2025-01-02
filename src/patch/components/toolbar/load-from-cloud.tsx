import React, { useCallback, useContext } from 'react';
import { OpenFromCloudSvg } from './svg';
import { patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';

export const LoadFromCloud: React.FC = () => {
	const { dispatch } = useContext(PatchContext);

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
