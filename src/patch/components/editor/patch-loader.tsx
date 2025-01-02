import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import { DatabasePatch, useApi } from '../../../api/use-api';
import { patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';

const root = document.getElementById('root');

export const PatchLoader: React.FC = () => {
	const { loadingFromCloud, dispatch } = useContext(PatchContext);

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
