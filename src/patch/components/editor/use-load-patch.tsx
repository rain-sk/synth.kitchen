import React, { useEffect, useRef, useState } from 'react';
import { DatabasePatch, useApi } from '../../../api/use-api';
import { IPatchAction, patchActions } from '../../state/actions';
import { useLocation } from 'wouter';
import { blankPatchToClearCanvas, blankPatchToLoad } from '../../state';
import { IPatchState } from '../../state/types/patch';
import { connectorButtonExists, connectorKey } from '../../state/connection';
import { randomId } from '../../../utils/random-id';

const doLoadConnections = (
	connectedConnectors: Set<string>,
	dispatch: React.Dispatch<IPatchAction>,
) => {
	const connectorButtonsExist = [...connectedConnectors].every((key) =>
		connectorButtonExists(key),
	);
	if (connectorButtonsExist) {
		dispatch(patchActions.loadConnectionsAction());
	} else {
		setTimeout(() => doLoadConnections(connectedConnectors, dispatch), 17);
	}
};

export const useLoadPatch = (
	state: IPatchState,
	dispatch: React.Dispatch<IPatchAction>,
	id?: string,
) => {
	const { connections, connectors } = state;

	const [, navigate] = useLocation();
	const { getPatches } = useApi();
	const [loadConnections, setLoadConnections] = useState(false);

	const loadingRef = useRef(false);
	useEffect(() => {
		if (!id && state.id === '' && !loadingRef.current) {
			loadingRef.current = true;
			const patchId = randomId();
			dispatch(patchActions.loadPatchAction(blankPatchToLoad(patchId)));
			setTimeout(() => {
				loadingRef.current = false;
				navigate(`/patch/${patchId}`, { replace: true });
				setLoadConnections(true);
			}, 50);
		}
	}, [id, state.id]);

	useEffect(() => {
		(async () => {
			if (id && state.id === '' && !loadingRef.current) {
				loadingRef.current = true;

				const { rows: patches } = (await getPatches().then(
					(res) => res && res.json(),
				)) as { rows: DatabasePatch[] };

				const [patch] = patches
					.filter((patch) => patch.ID === id)
					.map((patch) => JSON.parse(patch.Patch));

				dispatch(patchActions.loadPatchAction(blankPatchToClearCanvas()));
				setTimeout(() => {
					dispatch(
						patchActions.loadPatchAction(patch ? patch : blankPatchToLoad()),
					);
					navigate(`/patch/${id}`, { replace: true });
					setLoadConnections(true);
					loadingRef.current = false;
				}, 50);
			}
		})();
	}, [id, state.id]);

	useEffect(() => {
		if (loadConnections) {
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
				doLoadConnections(connectedConnectors, dispatch);
			}
		}
	}, [loadConnections, connections, connectors]);
};
