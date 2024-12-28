import React, { useCallback, useEffect, useState } from 'react';
import { DatabasePatch, useApi } from '../hooks/use-api';
import { useDispatchContext } from '../hooks/use-dispatch-context';
import { loadPatchAction } from '../state/actions/load-patch';
import ReactModal from 'react-modal';

export const PatchLoader: React.FC<{
	loadingFromCloud: boolean;
	setLoadingFromCloud: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ loadingFromCloud, setLoadingFromCloud }) => {
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
			setLoadingFromCloud(false);
		},
		[dispatch, loadPatchAction, setLoadingFromCloud],
	);

	const onClose = useCallback(() => {
		setLoadingFromCloud(false);
	}, [setLoadingFromCloud]);

	const root = document.getElementById('root');
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
