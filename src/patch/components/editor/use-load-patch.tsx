import React, { useEffect } from 'react';
import { DatabasePatch, useApi } from '../../../api/use-api';
import { IPatchAction, patchActions } from '../../state/actions';
import { useLocation } from 'wouter';
import { blankPatch } from '../../state';

export const useLoadPatch = (
	dispatch: React.Dispatch<IPatchAction>,
	id?: string,
) => {
	const [, navigate] = useLocation();
	const { getPatches } = useApi();

	useEffect(() => {
		if (id) {
			dispatch(
				patchActions.loadPatchAction({
					id: '',
					name: '',
					modules: {},
					modulePositions: {},
					connections: {},
				}),
			);
			getPatches()
				.then((res) => res && res.json())
				.then((data: { rows: DatabasePatch[] }) => {
					data.rows.forEach((row) => {
						if (row.ID === id) {
							dispatch(patchActions.loadPatchAction(JSON.parse(row.Patch)));
						}
					});
				});
		} else {
			dispatch(patchActions.loadPatchAction(blankPatch()));
		}
	}, [id, getPatches, navigate]);
};
