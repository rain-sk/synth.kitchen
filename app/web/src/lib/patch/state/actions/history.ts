export type IBlockHistory = {
	type: 'BlockHistory';
};

export const blockHistoryAction = (): IBlockHistory => ({
	type: 'BlockHistory',
});

export type IUnblockHistory = {
	type: 'UnblockHistory';
};

export const unblockHistoryAction = (): IUnblockHistory => ({
	type: 'UnblockHistory',
});

export type IPushToHistory = {
	type: 'PushToHistory';
	force?: boolean;
	historyPointer?: number;
};

export const pushToHistoryAction = (
	force: boolean = false,
): IPushToHistory => ({
	type: 'PushToHistory',
	force,
});

export type IUndo = {
	type: 'Undo';
};

export const undoAction = (): IUndo => ({
	type: 'Undo',
});

export type IRedo = {
	type: 'Redo';
};

export const redoAction = (): IRedo => ({
	type: 'Redo',
});
