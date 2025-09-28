import React, { useEffect } from 'react';
import { IPatchAction } from '../../../state/actions';

export const AsyncQueue: React.FC<{
	asyncActionQueue: IPatchAction[];
	dispatch: React.Dispatch<IPatchAction>;
}> = ({ asyncActionQueue, dispatch }) => {
	useEffect(() => {
		if (asyncActionQueue.length > 0) {
			console.log('flushing asyncActionQueue', asyncActionQueue);
			dispatch(asyncActionQueue[0]);
		} else {
			console.log('asyncActionQueue flushed');
		}
	}, [asyncActionQueue]);

	return null;
};
