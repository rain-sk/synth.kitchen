import React, { useRef } from 'react';

export const useSyncedRef = <T>(value: T): React.RefObject<T> => {
	const ref = useRef(value);
	if (ref.current !== value) {
		ref.current = value;
	}
	return ref;
};
