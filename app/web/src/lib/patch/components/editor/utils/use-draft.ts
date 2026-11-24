import { useCallback, useEffect, useRef, useState } from 'react';

import { patchActions } from '../../../state/actions';
import { IPatchState } from '../../../state/types/patch';
import { ISerializedPatch } from '../../../state/types/serialized-patch';
import { resetAudioContext } from '../../../audio';
import { t } from '../../../../../lang';
import { useToasts } from '../../../../shared/components/toasts';
import {
	Draft,
	clearDraft,
	readDraft,
	sameState,
	writeDraft,
} from '../../../storage/draft';
import { useApi } from '../../../api';
import { blankPatchToLoad } from '../../../state';

const patchState = (state: IPatchState) => ({
	version: state.version,
	name: state.name,
	modules: state.modules,
	modulePositions: state.modulePositions,
	connections: state.connections,
});

const serialize = (state: IPatchState): ISerializedPatch => ({
	id: state.id,
	name: state.name,
	slug: state.slug,
	state: patchState(state),
});

export const useDraft = ({
	state,
	dispatch,
	initialized,
	loading,
	preset,
}: {
	state: IPatchState;
	dispatch: React.Dispatch<ReturnType<typeof patchActions.loadPatchAction>>;
	initialized: boolean;
	loading: boolean;
	preset?: unknown;
}) => {
	const { notify, dismiss } = useToasts();
	const { getPatch } = useApi();
	const [draft, setDraft] = useState<Draft | null>(null);
	const [ready, setReady] = useState(false);

	const baseline = useRef<string>('');
	const resolved = useRef(false);
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const settled =
		initialized && !loading && !preset && !state.connectionsToLoad;
	const key = state.id || 'new';

	useEffect(() => {
		if (!settled || resolved.current) return;
		resolved.current = true;

		const found = readDraft(state.id);

		if (!found) {
			setDraft(null);
			setReady(true);
			baseline.current = JSON.stringify(patchState(state));
			return;
		}

		if (state.id && sameState(found.patch.state, patchState(state))) {
			clearDraft(state.id);
			setDraft(null);
			setReady(true);
			baseline.current = JSON.stringify(patchState(state));
			return;
		}

		baseline.current = JSON.stringify(found.patch.state);
		setDraft(found);
		setReady(true);

		dispatch(patchActions.loadPatchAction({ ...found.patch }));
		notify({
			key: `draft:${key}`,
			kind: 'info',
			message: t('patch.draftRestored'),
		});
	}, [settled, state.id, key, dispatch, notify, state.modules]);

	useEffect(() => {
		if (!settled || !resolved.current) return;

		const current = JSON.stringify(patchState(state));
		if (current === baseline.current) return;

		if (timer.current) clearTimeout(timer.current);
		timer.current = setTimeout(() => {
			if (writeDraft(state.id, serialize(state))) {
				baseline.current = current;
				setDraft({
					version: 'current',
					savedAt: new Date().toISOString(),
					patch: serialize(state),
				});
			}
		}, 500);

		return () => {
			if (timer.current) clearTimeout(timer.current);
		};
	}, [settled, state, state.id]);

	useEffect(() => {
		if (!settled || !resolved.current) return;

		const flush = () => {
			if (timer.current) clearTimeout(timer.current);
			const current = JSON.stringify(patchState(state));
			if (current !== baseline.current) writeDraft(state.id, serialize(state));
		};

		window.addEventListener('pagehide', flush);
		return () => window.removeEventListener('pagehide', flush);
	}, [settled, state, state.id]);

	useEffect(() => {
		if (loading || state.connectionsToLoad) {
			resolved.current = false;
			setReady(false);
		}
	}, [loading, state.connectionsToLoad]);

	const reset = useCallback(() => {
		clearDraft(state.id);
		setDraft(null);
		baseline.current = '';
		dismiss(`draft:${key}`);

		const load = async () => {
			if (state.id) {
				const patch = await getPatch({ id: state.id });
				if (patch) {
					baseline.current = JSON.stringify(patch.state.state);
					dispatch(
						patchActions.loadPatchAction({
							id: patch.id,
							name: patch.name,
							slug: patch.slug,
							state: patch.state.state,
						}),
					);
				}
			} else {
				dispatch(patchActions.loadPatchAction(blankPatchToLoad()));
			}
			try {
				await resetAudioContext();
			} catch {
			}
		};

		void load();
	}, [dismiss, dispatch, getPatch, key, state.id]);

	const markSaved = useCallback(() => {
		clearDraft(state.id);
		baseline.current = JSON.stringify(patchState(state));
		setDraft(null);
	}, [state.id, state]);

	return { draft, dirty: draft !== null, ready, reset, markSaved };
};
