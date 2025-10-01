import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useRoute } from 'wouter';

import { blankPatchToClearCanvas, blankPatchToLoad } from '../../../state';
import { IPatchAction, patchActions } from '../../../state/actions';
import { IPatchState } from '../../../state/types/patch';

import { useApi } from '../../../api';
import { useRefBackedState } from '../../../../shared/utils/use-ref-backed-state';
import { resetAudioContext } from '../../../audio';
import { PatchQuery } from 'synth.kitchen-shared';
import { ISerializedPatch } from '../../../state/types/serialized-patch';

const uuidRegex =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isUuid = (string: string) => uuidRegex.test(string);

export const useLoadPatch = (
	state: IPatchState,
	dispatch: React.Dispatch<IPatchAction>,
	initialized: boolean,
	slug: string,
) => {
	const [, navigate] = useLocation();
	const { getPatch } = useApi();

	const [_, loading, setLoading] = useRefBackedState(false);

	const [patchToLoad, setPatchToLoad] = useState<ISerializedPatch>();
	useEffect(() => {
		if (initialized && !loading && patchToLoad) {
			dispatch(
				patchActions.loadPatchAction({
					id: patchToLoad.id,
					name: patchToLoad.name,
					slug: patchToLoad.slug,
					state: patchToLoad.state,
				}),
			);
			dispatch(patchActions.pushToHistoryAction(true));
			navigate(`/patch/${patchToLoad.slug}`, { replace: false });
		}
	}, [loading, patchToLoad, initialized]);

	const [newPatch] = useRoute('/patch/new');
	const [randomPatch] = useRoute('/patch/random');
	const onRouteChange = useCallback(async () => {
		setLoading(true);
		dispatch(patchActions.loadPatchAction(blankPatchToClearCanvas()));
		await resetAudioContext();
		if (newPatch) {
			setPatchToLoad(blankPatchToLoad());
		} else if (slug) {
			const query: PatchQuery = randomPatch
				? { random: true }
				: isUuid(slug ?? '')
				? { id: slug }
				: { slug };

			try {
				const patch = await getPatch(query);
				if (patch) {
					setPatchToLoad({
						id: patch.id,
						name: patch.name,
						slug: patch.slug,
						state: patch.state.state,
					});
				}
			} catch (e) {
				console.error(e);
				navigate('/patch/new', { replace: false });
			}
		}
		setLoading(false);
	}, [newPatch, randomPatch, slug]);

	useEffect(() => {
		onRouteChange();
	}, [onRouteChange]);

	const { connectionsToLoad } = state;
	const loadingConnectionsRef = useRef(false);
	useEffect(() => {
		if (
			initialized &&
			!loadingConnectionsRef.current &&
			connectionsToLoad &&
			Object.keys(connectionsToLoad.state).length > 0
		) {
			loadingConnectionsRef.current = true;
			dispatch(patchActions.blockHistoryAction());
			dispatch(patchActions.loadConnectionsAction());
		} else if (
			!connectionsToLoad ||
			(connectionsToLoad && Object.keys(connectionsToLoad.state).length === 0)
		) {
			loadingConnectionsRef.current = false;
		}
	}, [initialized, connectionsToLoad]);

	return loading;
};
