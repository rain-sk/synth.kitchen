import isCallable from 'is-callable';
import { useCallback, useMemo, useRef, useState } from 'react';

export const useRefBackedState = <T>(initialValue: T | (() => T)) => {
	const computedInitialValue: T = useMemo(() => {
		return isCallable(initialValue) ? initialValue() : initialValue;
	}, []);

	const ref = useRef(computedInitialValue);
	const [state, setState] = useState(ref.current);

	const doSetState = useCallback((newState: T) => {
		ref.current = newState;
		setState(ref.current);
	}, []);

	return [ref, state, doSetState] as [
		React.RefObject<T>,
		T,
		React.Dispatch<React.SetStateAction<T>>,
	];
};
