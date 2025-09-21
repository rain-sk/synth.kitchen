import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useRoute } from 'wouter';

import {
	blankPatch,
	blankPatchToClearCanvas,
	blankPatchToLoad,
} from '../../state';
import { IPatchAction, patchActions } from '../../state/actions';
import { connectorButtonExists, connectorKey } from '../../state/connection';
import { IPatchState } from '../../state/types/patch';

import { useApi } from '../../api';

const uuidRegex =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const doLoadConnections = async (
	connectedConnectors: Set<string>,
	dispatch: React.Dispatch<IPatchAction>,
) => {
	await new Promise((resolve) => {
		const tryLoad = async () => {
			const connectorButtonsExist = [...connectedConnectors].every((key) =>
				connectorButtonExists(key),
			);
			if (connectorButtonsExist) {
				dispatch(patchActions.loadConnectionsAction());
				resolve(undefined);
			} else {
				tryLoad();
			}
		};
		tryLoad();
	});
};

export const useLoadPatch = (
	state: IPatchState,
	dispatch: React.Dispatch<IPatchAction>,
	initialized: boolean,
	slug?: string,
) => {
	const { connections, connectors } = state;

	const [newPatch] = useRoute('/patch/new');
	const [randomPatch] = useRoute('/patch/random');
	const [, navigate] = useLocation();
	const { getPatch } = useApi();
	const [loadConnections, setLoadConnections] = useState(false);

	const [loading, setLoading] = useState(false);
	const loadingRef = useRef(loading);

	useEffect(() => {
		if (loadingRef.current) {
			return;
		}

		(async () => {
			if (newPatch) {
				dispatch(
					patchActions.loadPatchAction(
						initialized ? blankPatchToLoad() : blankPatch(),
					),
				);
			} else if (randomPatch) {
				// Load a random patch
				loadingRef.current = true;
				setLoading(loadingRef.current);
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
					setLoadConnections(true);
					navigate(`/patch/${patch.slug}`, { replace: false });
				} else {
					navigate('/patch/new', { replace: true });
				}
				loadingRef.current = false;
				setLoading(loadingRef.current);
			} else if (slug && state.slug === '') {
				loadingRef.current = true;
				setLoading(loadingRef.current);
				dispatch(patchActions.loadPatchAction(blankPatchToClearCanvas()));
				const patch = await getPatch(
					uuidRegex.test(slug) ? { id: slug } : { slug },
				);
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
					setLoadConnections(true);
					if (slug !== patch.slug) {
						navigate(`/patch/${patch.slug}`, { replace: false });
					}
				} else {
					navigate('/patch/new', { replace: true });
				}
				loadingRef.current = false;
				setLoading(loadingRef.current);
			} else if (!slug) {
				navigate('/patch/new', { replace: true });
			}
		})();
	}, [initialized, newPatch, randomPatch, slug, state.slug]);

	const loadConnectionsRef = useRef(false);
	useEffect(() => {
		(async () => {
			if (!loadConnectionsRef.current && loadConnections) {
				loadConnectionsRef.current = true;
				const connectedConnectors = new Set<string>();
				Object.values(connections).forEach(([output, input]) => {
					connectedConnectors.add(connectorKey(output));
					connectedConnectors.add(connectorKey(input));
				});
				if (
					connectedConnectors.size > 0 &&
					[...connectedConnectors].every((key) => key in connectors)
				) {
					setLoadConnections(false);
					await doLoadConnections(connectedConnectors, dispatch);
				}
				loadConnectionsRef.current = false;
			}
		})();
	}, [loadConnections, connections, connectors]);

	return loading;
};
