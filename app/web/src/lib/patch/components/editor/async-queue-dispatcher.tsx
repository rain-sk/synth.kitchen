import React, { useEffect } from 'react';
import { IPatchAction } from '../../state/actions';

export const AsyncQueueDispatcher: React.FC<{
	asyncActionQueue: IPatchAction[];
	dispatch: React.Dispatch<IPatchAction>;
}> = ({ asyncActionQueue, dispatch }) => {
	useEffect(() => {
		if (asyncActionQueue.length > 0) {
			dispatch(asyncActionQueue[0]);
		}
	}, [asyncActionQueue]);

	return null;
};
