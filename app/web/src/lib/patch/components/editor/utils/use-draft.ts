import { useCallback, useEffect, useRef, useState } from 'react';

import { patchActions } from '../../../state/actions';
import { IPatchState } from '../../../state/types/patch';
import { ISerializedPatch } from '../../../state/types/serialized-patch';
import { resetAudioContext } from '../../../audio';
import { t } from '../../../../../lang';
import { useToasts } from '../../../../shared/components/toasts';
import {
	Draft,
	NEW_PATCH,
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
	slug,
}: {
	state: IPatchState;
	dispatch: React.Dispatch<ReturnType<typeof patchActions.loadPatchAction>>;
	initialized: boolean;
	loading: boolean;
	preset?: unknown;
	slug?: string;
}) => {
	const { notify, dismiss } = useToasts();
	const { getPatch } = useApi();
	const [draft, setDraft] = useState<Draft | null>(null);
	const [ready, setReady] = useState(false);

	const latest = useRef<IPatchState | undefined>(undefined);
	latest.current = state;

	const baseline = useRef<string>('');
	const baselinePatch = useRef<ISerializedPatch | undefined>(undefined);
	const resolved = useRef(false);
	const pendingReload = useRef(false);
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const settled =
		initialized && !loading && !preset && !state.connectionsToLoad;
	const key = state.id || 'new';

	useEffect(() => {
		if (!settled || resolved.current) return;
		if (slug && slug !== NEW_PATCH && !state.id) return;
		resolved.current = true;

		const found = readDraft(state.id);

		if (!found) {
			setDraft(null);
			setReady(true);
			baseline.current = JSON.stringify(patchState(state));
			baselinePatch.current = serialize(state);
			return;
		}

		if (state.id && sameState(found.patch.state, patchState(state))) {
			clearDraft(state.id);
			setDraft(null);
			setReady(true);
			baseline.current = JSON.stringify(patchState(state));
			baselinePatch.current = serialize(state);
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
	}, [settled, state.id, key, dispatch, notify, state.modules, slug]);

	useEffect(() => {
		if (!settled || !resolved.current) return;

		const current = JSON.stringify(patchState(state));
		if (current === baseline.current) return;

		if (timer.current) clearTimeout(timer.current);
		timer.current = setTimeout(() => {
			const fresh = latest.current;
			if (!fresh || fresh.id !== state.id) return;
			const current = JSON.stringify(patchState(fresh));
			if (current === baseline.current) return;
			if (writeDraft(fresh.id, serialize(fresh))) {
				baseline.current = current;
				setDraft({
					version: 'current',
					savedAt: new Date().toISOString(),
					patch: serialize(fresh),
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
		if (loading) {
			pendingReload.current = true;
		} else if (pendingReload.current) {
			pendingReload.current = false;
			resolved.current = false;
			setReady(false);
		}
	}, [loading]);

	const reset = useCallback(() => {
		clearDraft(state.id);
		setDraft(null);
		dismiss(`draft:${key}`);
		if (timer.current) clearTimeout(timer.current);

		const load = async () => {
			try {
				await resetAudioContext();
			} catch {}

			if (state.id) {
				const patch = await getPatch({ id: state.id });
				if (patch) {
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
				baselinePatch.current = baselinePatch.current ?? blankPatchToLoad();
				dispatch(patchActions.loadPatchAction(baselinePatch.current));
			}
			resolved.current = false;
		};

		void load();
	}, [dismiss, dispatch, getPatch, key, state.id]);

	const markSaved = useCallback(() => {
		clearDraft(state.id);
		baseline.current = JSON.stringify(patchState(state));
		setDraft(null);
	}, [state.id, state]);

	return {
		draft,
		dirty: draft !== null,
		ready: ready && !state.connectionsToLoad,
		reset,
		markSaved,
	};
};
