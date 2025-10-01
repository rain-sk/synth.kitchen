import { useCallback, useContext } from 'react';

import { ISerializedPatch } from '../../state/types/serialized-patch';
import { PatchContext } from '../../contexts/patch';
import { SaveToDiskSvg } from './svg';
import { PATCH_STATE_VERSIONS } from 'synth.kitchen-shared';

export const SaveToDisk = () => {
	const { id, name, slug, modules, modulePositions, connections } =
		useContext(PatchContext);

	const onDownload = useCallback(() => {
		const patch: ISerializedPatch = {
			id,
			name,
			slug,
			state: {
				version: PATCH_STATE_VERSIONS[0],
				name,
				modules,
				modulePositions,
				connections,
			},
		};

		// https://code.tutsplus.com/tutorials/how-to-save-a-file-with-javascript--cms-41105
		{
			const a = document.createElement('a');
			const blob = new Blob([JSON.stringify(patch)], {
				type: 'text/json',
			});

			a.setAttribute('href', URL.createObjectURL(blob));
			a.setAttribute('download', `${name}.json`);
			a.click();

			URL.revokeObjectURL(a.href);
		}
	}, [name, modules, modulePositions, connections]);

	return (
		<button type="button" onClick={onDownload}>
			<span className="visually-hidden">save to disk</span>
			<SaveToDiskSvg />
		</button>
	);
};
