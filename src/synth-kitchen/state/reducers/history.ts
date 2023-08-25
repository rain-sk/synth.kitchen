import { actions } from '../actions';
import { HistoryChangeType, IHistory } from '../actions/history';
import { IPatch } from '../types/patch';
import { IState } from '../types/state';

export const history: React.Reducer<IState, IHistory> = (state, action) => {
	const { type, connections } = action.payload;

	const nothingToUndo =
		type === HistoryChangeType.UNDO &&
		state.patchHistoryOffset === state.patchHistory.length - 1;
	const nothingToRedo =
		type === HistoryChangeType.REDO && state.patchHistoryOffset <= 0;

	if (nothingToUndo || nothingToRedo) {
		return state;
	}

	if (type === HistoryChangeType.UNDO && state.patchHistoryOffset === -1) {
		state = {
			...history(state, actions.historyPushAction()),
			patchHistoryOffset: 0
		};
	}

	let { modules, name, patchHistory, patchHistoryOffset } = state;

	switch (type) {
		case HistoryChangeType.PUSH: {
			const newPatchHistory =
				patchHistoryOffset > 0
					? patchHistory.splice(0, patchHistory.length - 1 - patchHistoryOffset)
					: [...patchHistory];

			const currentPatch = {
				modules,
				name,
				connections
			};

			const mostRecentPatch =
				newPatchHistory.length > 0
					? newPatchHistory[newPatchHistory.length - 1]
					: {};

			if (JSON.stringify(currentPatch) === JSON.stringify(mostRecentPatch)) {
				return {
					...state,
					patchHistoryOffset: -1
				};
			} else {
				newPatchHistory.push(currentPatch);
				console.log(newPatchHistory);
				return {
					...state,
					patchHistory: newPatchHistory,
					patchHistoryOffset: -1
				};
			}
		}
		case HistoryChangeType.REDO: {
			const newPatchHistoryOffset = patchHistoryOffset - 1;
			const newPatch: IPatch =
				patchHistory[patchHistory.length - 1 - newPatchHistoryOffset];
			return {
				...state,
				...newPatch,
				patchHistoryOffset: newPatchHistoryOffset
			};
		}
		case HistoryChangeType.UNDO: {
			const newPatchHistoryOffset = patchHistoryOffset + 1;
			const newPatch: IPatch =
				patchHistory[patchHistory.length - 1 - newPatchHistoryOffset];
			return {
				...state,
				...newPatch,
				patchHistoryOffset: newPatchHistoryOffset
			};
		}
	}
};
