export enum HistoryChangeType {
	PUSH,
	REDO,
	UNDO
}

export type IHistory = {
	type: 'History';
	payload: {
		type: HistoryChangeType;
		connections?: Record<string, [string, string]>;
	};
};

export const historyPushAction = (
	connections?: Record<string, [string, string]>
): IHistory => ({
	type: 'History',
	payload: {
		type: HistoryChangeType.PUSH,
		connections
	}
});

export const historyRedoAction = (): IHistory => ({
	type: 'History',
	payload: {
		type: HistoryChangeType.REDO
	}
});

export const historyUndoAction = (): IHistory => ({
	type: 'History',
	payload: {
		type: HistoryChangeType.UNDO
	}
});
