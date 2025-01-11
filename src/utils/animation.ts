type AnimationCallback = () => void;

const callbackQueue: AnimationCallback[] = [];
const callbackRecords: Record<string, number> = {};

const flushCallbackQueue = () => {
	for (const callback of callbackQueue.splice(0, callbackQueue.length)) {
		callback();
	}
	for (let key in callbackRecords) {
		delete callbackRecords[key];
	}
};

export const queueAnimation = (callback: AnimationCallback, key?: string) => {
	if (callbackQueue.length === 0) {
		requestAnimationFrame(flushCallbackQueue);
	}
	if (key) {
		if (key in callbackRecords) {
			callbackQueue[callbackRecords[key]] = callback;
		} else {
			callbackRecords[key] = callbackQueue.length;
			callbackQueue.push(callback);
		}
	} else {
		callbackQueue.push(callback);
	}
};
