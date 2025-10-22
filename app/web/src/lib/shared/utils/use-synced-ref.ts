import React, { useRef } from 'react';

export const useSyncedRef = <T>(value: T): React.RefObject<T> => {
	const ref = useRef(value);
	if (ref.current !== value) {
		ref.current = value;
	}
	return ref;
};

export const useSyncedUpdateRef = <T>(
	value: T,
): [React.RefObject<T>, boolean] => {
	const ref = useRef(value);
	let update = false;
	if (ref.current !== value) {
		ref.current = value;
		update = true;
	}
	return [ref, update];
};
