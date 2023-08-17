export enum HistoryChangeType {
	PUSH,
	REDO,
	UNDO
}

export type IHistory = {
	type: 'History';
	payload: {
		type: HistoryChangeType;
	};
};

export const historyPushAction = (): IHistory => ({
	type: 'History',
	payload: {
		type: HistoryChangeType.PUSH
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
