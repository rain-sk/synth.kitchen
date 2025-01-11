import React, { useEffect, useRef, useState } from 'react';
import { DatabasePatch, useApi } from '../../../api/use-api';
import { IPatchAction, patchActions } from '../../state/actions';
import { useLocation } from 'wouter';
import { blankPatch } from '../../state';
import { IPatchState } from '../../state/types/patch';
import { connectorButtonExists, connectorKey } from '../../state/connection';

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
		if (id && !loadingRef.current) {
			loadingRef.current = true;
			getPatches()
				.then((res) => res && res.json())
				.then((data: { rows: DatabasePatch[] }) => {
					const [patch] = data.rows
						.filter((row) => row.ID === id)
						.map((row) => JSON.parse(row.Patch));
					dispatch(patchActions.loadPatchAction(patch));
				})
				.finally(() => {
					loadingRef.current = false;
					setLoadConnections(true);
				});
		} else {
			dispatch(patchActions.loadPatchAction(blankPatch()));
		}
	}, [id, getPatches, navigate]);

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
				console.log('load connections');
				doLoadConnections(connectedConnectors, dispatch);
			}
		}
	}, [loadConnections, connections, connectors]);
};
