import React, { useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import { DatabasePatch, useApi } from '../../../hooks/use-api';
import { useDispatchContext } from '../../../hooks/use-dispatch-context';
import { patchActions } from '../../../state/actions';
import { useStateContext } from '../../../hooks/use-state-context';

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
			dispatch(patchActions.loadPatchAction(JSON.parse(patch.Patch)));
		},
		[dispatch],
	);

	const onClose = useCallback(() => {
		dispatch(patchActions.cancelLoadFromCloudAction());
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
