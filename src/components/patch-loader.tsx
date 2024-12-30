import React, { useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import { DatabasePatch, useApi } from '../hooks/use-api';
import { useDispatchContext } from '../hooks/use-dispatch-context';
import { loadPatchAction } from '../state/actions/load-patch';
import { useStateContext } from '../hooks/use-state-context';
import { cancelLoadFromCloudAction } from '../state/actions/cancel-load-from-cloud';

const root = document.getElementById('root');

export const PatchLoader: React.FC = () => {
	const { loadingFromCloud } = useStateContext();
	const dispatch = useDispatchContext();

	const [patches, setPatches] = useState<DatabasePatch[]>([]);

	const { getPatches } = useApi();

	useEffect(() => {
		getPatches()
			.then((res) => res && res.json())
			.then((data: { rows: DatabasePatch[] }) => setPatches(data.rows));
	}, [loadingFromCloud, setPatches, getPatches]);

	const open = useCallback(
		(patch: DatabasePatch) => () => {
			dispatch(loadPatchAction(JSON.parse(patch.Patch)));
		},
		[dispatch, loadPatchAction],
	);

	const onClose = useCallback(() => {
		dispatch(cancelLoadFromCloudAction());
	}, [dispatch]);

	return root ? (
		<ReactModal isOpen={loadingFromCloud} appElement={root}>
			<button type="button" aria-label="close" onClick={onClose}>
				<span role="presentation">X</span>
			</button>
			<ul className="patch-list">
				{patches.map((patch) => (
					<li key={patch.ID}>
						<button type="button" onClick={open(patch)}>
							{patch.Name}
						</button>
					</li>
				))}
			</ul>
		</ReactModal>
	) : null;
};
