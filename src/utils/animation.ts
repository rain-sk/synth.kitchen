type AnimationCallback = () => void;

const callbackQueue: AnimationCallback[] = [];

const flushCallbackQueue = () => {
	for (const callback of callbackQueue.splice(0, callbackQueue.length)) {
		callback();
	}
};

export const queueAnimation = (callback: AnimationCallback) => {
	if (callbackQueue.length === 0) {
		requestAnimationFrame(flushCallbackQueue);
	}
	callbackQueue.push(callback);
};

export const queueAnimationCallback = (callback: AnimationCallback) => () =>
	queueAnimation(callback);
