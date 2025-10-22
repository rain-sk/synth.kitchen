import { useCallback, useContext } from 'react';

import { ISerializedPatch } from '../../state/types/serialized-patch';
import { Key } from '../../constants/key';
import { OpenFromDiskSvg } from './svg';
import { patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';
import { blankPatchToClearCanvas } from '../../state';

export const LoadFromDisk = () => {
	const { dispatch } = useContext(PatchContext);

	// https://researchhubs.com/post/computing/javascript/open-a-local-file-with-javascript.html
	const onUpload = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = (e.target as any).files[0];
			if (!file) {
				return;
			}
			dispatch(patchActions.loadPatchAction(blankPatchToClearCanvas()));
			const reader = new FileReader();
			reader.onload = (e) => {
				const patch = JSON.parse((e.target as any).result) as ISerializedPatch;
				dispatch(patchActions.loadPatchAction(patch));
			};
			reader.readAsText(file);
		},
		[dispatch],
	);

	const handleLoadKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
		const key = e.key.toLowerCase();
		if (key === Key.ENTER || key === Key.SPACE) {
			e.preventDefault();
			(e.nativeEvent.target as any).querySelector('input').click();
		}
	};

	return (
		<label id="load" tabIndex={0} onKeyDown={handleLoadKeyDown}>
			<span className="visually-hidden">open from disk</span>
			<OpenFromDiskSvg />
			<input type="file" onChange={onUpload} accept="application/json" />
		</label>
	);
};
