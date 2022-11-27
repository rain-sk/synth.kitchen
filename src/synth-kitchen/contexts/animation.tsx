import React, { useCallback, useContext, useRef } from 'react';

type AnimationCallback = () => void;

const Context = React.createContext((callback: AnimationCallback) => {});

export const AnimationContext: React.FC<{ children?: React.ReactNode }> = ({
	children
}) => {
	const callbackQueueRef = useRef<AnimationCallback[]>([]);

	const { current: flushCallbackQueue } = useRef(() => {
		for (const callback of callbackQueueRef.current) {
			callback();
		}
		callbackQueueRef.current = [];
	});

	const { current: queueAnimationCallback } = useRef(
		(callback: AnimationCallback) => {
			if (callbackQueueRef.current.length === 0) {
				requestAnimationFrame(flushCallbackQueue);
			}
			callbackQueueRef.current.push(callback);
		}
	);

	return (
		<Context.Provider value={queueAnimationCallback}>
			{children}
		</Context.Provider>
	);
};

export const useAnimationContext = () => useContext(Context);