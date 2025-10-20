import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';

import { blankPatchToClearCanvas, blankPatchToLoad } from '../../../state';
import { IPatchAction, patchActions } from '../../../state/actions';
import { IPatchState } from '../../../state/types/patch';

import { useApi } from '../../../api';
import { useRefBackedState } from '../../../../shared/utils/use-ref-backed-state';
import { resetAudioContext } from '../../../audio';
import { PatchInfo, PatchQuery } from 'synth.kitchen-shared';
import { ISerializedPatch } from '../../../state/types/serialized-patch';
import { Preset } from '../../../../learn';

const uuidRegex =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isUuid = (string: string) => uuidRegex.test(string);

export const useLoadPatch = (
	state: IPatchState,
	dispatch: React.Dispatch<IPatchAction>,
	initialized: boolean,
	slug?: string,
	preset?: Preset,
) => {
	const suppressLoad = !!preset;

	const { connectionsToLoad, slug: stateSlug } = state;
	useEffect(() => {
		if (initialized && connectionsToLoad) {
			dispatch(patchActions.loadConnectionsAction());
		}
	}, [initialized, connectionsToLoad]);

	const [newPatch] = useRoute('/patch/new');
	const [randomPatch] = useRoute('/patch/random');

	const [, navigate] = useLocation();
	const { getPatch, randomPatch: getRandomPatch } = useApi();

	const [loadingRef, loading, setLoading] = useRefBackedState(false);

	const [patchInfo, setPatchInfo] = useState<PatchInfo>();
	const [patchToLoad, setPatchToLoad] = useState<ISerializedPatch>();

	const loadPatch =
		(newPatch || randomPatch || !!slug) &&
		initialized &&
		!loading &&
		!!patchToLoad;

	const onRouteChange = useCallback(async () => {
		if (suppressLoad || slug === stateSlug || loadingRef.current) {
			return;
		}

		setLoading(true);
		dispatch(patchActions.loadPatchAction(blankPatchToClearCanvas()));
		await resetAudioContext();
		if (newPatch) {
			setPatchToLoad(blankPatchToLoad());
		} else if (randomPatch) {
			const patch = await getRandomPatch();
			if (patch && patch.slug) {
				navigate(`/patch/${patch.slug}`, { replace: true });
			} else {
				navigate('/patch/new', { replace: false });
			}
		} else if (slug) {
			try {
				const query: PatchQuery = isUuid(slug ?? '') ? { id: slug } : { slug };
				const patch = await getPatch(query);
				if (patch) {
					setPatchInfo(patch);
					setPatchToLoad({
						id: patch.id,
						name: patch.name,
						slug: patch.slug,
						state: patch.state.state,
					});
				} else {
					// setTimeout(() => location.reload(), 500);
				}
			} catch (e) {
				console.error(e);
				navigate('/patch/new', { replace: false });
			}
		}
		setLoading(false);
	}, [newPatch, randomPatch, slug, stateSlug]);

	useEffect(() => {
		onRouteChange();
	}, [onRouteChange]);

	useEffect(() => {
		(async () => {
			if (preset && preset.setup && preset.setup.length > 0) {
				dispatch(patchActions.loadPatchAction(blankPatchToLoad()));
				await resetAudioContext();
				dispatch(patchActions.pushToAsyncQueue(preset.setup));
			}
		})();
	}, [preset]);

	useEffect(() => {
		if (loadPatch && patchToLoad) {
			const patch = patchToLoad;
			setPatchToLoad(undefined);
			dispatch(
				patchActions.loadPatchAction({
					id: patch.id,
					name: patch.name,
					slug: patch.slug,
					state: patch.state,
				}),
			);

			if (randomPatch) {
				navigate(`/patch/${patch.slug}`, { replace: true });
			}
		}
	}, [loadPatch]);

	return { loading, patchInfo };
};
