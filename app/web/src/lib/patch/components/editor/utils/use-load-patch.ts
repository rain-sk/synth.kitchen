import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useRoute } from 'wouter';

import { blankPatchToClearCanvas, blankPatchToLoad } from '../../../state';
import { IPatchAction, patchActions } from '../../../state/actions';
import { IPatchState } from '../../../state/types/patch';

import { useApi } from '../../../api';
import { useRefBackedState } from '../../../../shared/utils/use-ref-backed-state';
import { Patch } from 'synth.kitchen-shared';

const uuidRegex =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isUuid = (string: string) => uuidRegex.test(string);

export const useLoadPatch = (
	state: IPatchState,
	dispatch: React.Dispatch<IPatchAction>,
	initialized: boolean,
	slug?: string,
) => {
	const { connectionsToLoad } = state;

	const [newPatch] = useRoute('/patch/new');
	const [randomPatch] = useRoute('/patch/random');
	const [, navigate] = useLocation();
	const { getPatch } = useApi();

	const [loadingRef, loading, setLoading] = useRefBackedState(false);

	const [patchToLoad, setPatchToLoad] = useState<Patch>();
	useEffect(() => {
		if (initialized && !loading && patchToLoad) {
			dispatch(
				patchActions.loadPatchAction({
					id: patchToLoad.id,
					name: patchToLoad.name,
					slug: patchToLoad.slug,
					modules: patchToLoad.state.state.modules,
					modulePositions: patchToLoad.state.state.modulePositions,
					connections: patchToLoad.state.state.connections,
				}),
			);
			dispatch(patchActions.pushToHistoryAction(true));
		}
	}, [loading, patchToLoad, initialized]);

	useEffect(() => {
		if (loadingRef.current || patchToLoad) {
			return;
		}

		(async () => {
			if (newPatch) {
				dispatch(patchActions.loadPatchAction(blankPatchToLoad()));
				dispatch(patchActions.pushToHistoryAction(true));
			} else if (randomPatch) {
				// Load a random patch
				setLoading(true);
				dispatch(patchActions.loadPatchAction(blankPatchToClearCanvas()));
				const patch = await getPatch({ random: true });

				setPatchToLoad(patch);
				setLoading(false);

				if (patch) {
					dispatch(
						patchActions.loadPatchAction({
							id: patch.id,
							name: patch.name,
							slug: patch.slug,
							modulePositions: {},
							modules: {},
							connections: {},
						}),
					);
					navigate(`/patch/${patch.slug}`, { replace: false });
				} else {
					navigate('/patch/new', { replace: true });
				}
			} else if (slug && state.slug === '') {
				setLoading(true);
				dispatch(patchActions.loadPatchAction(blankPatchToClearCanvas()));
				const patch = await getPatch(isUuid(slug) ? { id: slug } : { slug });

				setPatchToLoad(patch);
				setLoading(false);

				if (patch) {
					dispatch(
						patchActions.loadPatchAction({
							id: patch.id,
							name: patch.name,
							slug: patch.slug,
							modulePositions: {},
							modules: {},
							connections: {},
						}),
					);
					if (slug !== patch.slug) {
						navigate(`/patch/${patch.slug}`, { replace: false });
					}
				} else {
					navigate('/patch/new', { replace: true });
				}
			}
		})();
	}, [initialized, newPatch, randomPatch, slug, state.slug]);

	const loadingConnectionsRef = useRef(false);
	useEffect(() => {
		if (
			initialized &&
			!loadingConnectionsRef.current &&
			connectionsToLoad &&
			connectionsToLoad.state &&
			Object.keys(connectionsToLoad.state).length > 0
		) {
			loadingConnectionsRef.current = true;
			dispatch(patchActions.blockHistoryAction());
			dispatch(patchActions.loadConnectionsAction());
		} else if (
			!connectionsToLoad ||
			(connectionsToLoad &&
				connectionsToLoad.state &&
				Object.keys(connectionsToLoad.state).length === 0)
		) {
			loadingConnectionsRef.current = false;
		}
	}, [initialized, connectionsToLoad]);

	return loading;
};
