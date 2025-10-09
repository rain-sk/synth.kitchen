import React, { useEffect, useRef } from 'react';
import { useLocation, useRoute } from 'wouter';

import {
	blankPatch,
	blankPatchToClearCanvas,
	blankPatchToLoad,
} from '../../../state';
import { IPatchAction, patchActions } from '../../../state/actions';
import { IPatchState } from '../../../state/types/patch';

import { useApi } from '../../../api';
import { useRefBackedState } from '../../../../shared/utils/use-ref-backed-state';

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

	useEffect(() => {
		if (loadingRef.current) {
			return;
		}

		(async () => {
			if (newPatch) {
				dispatch(patchActions.loadPatchAction(blankPatch()));
				setTimeout(() => {
					dispatch(patchActions.loadPatchAction(blankPatchToLoad()));
					dispatch(patchActions.pushToHistoryAction(true));
				}, 100);
			} else if (randomPatch) {
				// Load a random patch
				setLoading(true);
				dispatch(patchActions.loadPatchAction(blankPatchToClearCanvas()));
				const patch = await getPatch({ random: true });
				if (patch) {
					dispatch(
						patchActions.loadPatchAction({
							id: patch.id,
							name: patch.name,
							slug: patch.slug,
							modules: patch.state.state.modules,
							modulePositions: patch.state.state.modulePositions,
							connections: patch.state.state.connections,
						}),
					);
					navigate(`/patch/${patch.slug}`, { replace: false });
				} else {
					navigate('/patch/new', { replace: true });
				}
				setLoading(false);
			} else if (slug && state.slug === '') {
				setLoading(true);
				dispatch(patchActions.loadPatchAction(blankPatchToClearCanvas()));
				const patch = await getPatch(isUuid(slug) ? { id: slug } : { slug });
				if (patch) {
					dispatch(
						patchActions.loadPatchAction({
							id: patch.id,
							name: patch.name,
							slug: patch.slug,
							modules: patch.state.state.modules,
							modulePositions: patch.state.state.modulePositions,
							connections: patch.state.state.connections,
						}),
					);
					if (slug !== patch.slug) {
						navigate(`/patch/${patch.slug}`, { replace: false });
					}
				} else {
					navigate('/patch/new', { replace: true });
				}
				setLoading(false);
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
