import { useCallback, useContext } from 'react';

import { ISerializedPatch } from '../../state/types/serialized-patch';
import { KeyCode } from '../../../constants/key';
import { OpenFromDiskSvg } from './svg';
import { patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';

export const LoadFromDisk = () => {
	const { dispatch } = useContext(PatchContext);

	// https://researchhubs.com/post/computing/javascript/open-a-local-file-with-javascript.html
	const onUpload = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = (e.target as any).files[0];
			if (!file) {
				return;
			}
			const reader = new FileReader();
			reader.onload = (e) => {
				dispatch(
					patchActions.loadPatchAction({
						id: '',
						name: '',
						modules: {},
						modulePositions: {},
						connections: {},
					}),
				);
				const patch = JSON.parse((e.target as any).result) as ISerializedPatch;
				setTimeout(() => {
					dispatch(patchActions.loadPatchAction(patch));
				}, 100);
			};
			reader.readAsText(file);
		},
		[dispatch],
	);

	const handleLoadKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
		if (e.keyCode === KeyCode.ENTER || e.keyCode === KeyCode.SPACE) {
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
