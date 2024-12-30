import React, { useCallback } from 'react';
import { OpenFromCloudSvg } from '../svg';

export const LoadFromCloud: React.FC<{
	setLoadingFromCloud: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setLoadingFromCloud }) => {
	const onLoad = useCallback(() => {
		setLoadingFromCloud(true);
	}, [setLoadingFromCloud]);

	return (
		<button type="button" onClick={onLoad}>
			<span className="visually-hidden">load from cloud</span>
			<OpenFromCloudSvg />
		</button>
	);
};
