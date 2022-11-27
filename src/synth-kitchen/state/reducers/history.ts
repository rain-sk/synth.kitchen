import { actions } from '../actions';
import { HistoryChangeType, IHistory } from '../actions/history';
import { IPatch } from '../types/patch';
import { IState } from '../types/state';

export const history: React.Reducer<IState, IHistory> = (state, action) => {
	const { type } = action.payload;

	if (state.patchHistoryOffset === 0 && type === HistoryChangeType.UNDO) {
		state = history(state, actions.historyPushAction());
	}

	const { modules, name, patchHistory, patchHistoryOffset } = state;

	switch (type) {
		case HistoryChangeType.PUSH: {
			const newPatchHistory =
				patchHistoryOffset > 0
					? patchHistory.slice(0, patchHistory.length - 1 - patchHistoryOffset)
					: [...patchHistory];

			const currentPatch = {
				modules,
				name
			};

			const mostRecentPatch =
				newPatchHistory.length > 0
					? newPatchHistory[newPatchHistory.length - 1]
					: {};

			if (JSON.stringify(currentPatch) === JSON.stringify(mostRecentPatch)) {
				return state;
			} else {
				newPatchHistory.push({
					modules,
					name
				});
				return {
					...state,
					patchHistory: newPatchHistory,
					patchHistoryOffset: 0
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
