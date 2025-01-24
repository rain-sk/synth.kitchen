import { useCallback, useContext } from 'react';

import { ISerializedPatch } from '../../state/types/serialized-patch';
import { PatchContext } from '../../contexts/patch';
import { SaveToCloudSvg } from './svg/save-to-cloud';
import { PatchService } from '../../service';

export const SaveToCloud = () => {
	const { id, name, modules, modulePositions, connections } =
		useContext(PatchContext);

	// const { savePatch } = useApi();
	const savePatch = useCallback(async (patch: ISerializedPatch) => {
		await PatchService.create(patch);
	}, []);

	const onSave = useCallback(() => {
		const patch: ISerializedPatch = {
			id,
			name,
			modules,
			modulePositions,
			connections,
		};
		savePatch(patch);
	}, [id, name, modules, modulePositions, connections, savePatch]);

	return (
		<button type="button" onClick={onSave}>
			<span className="visually-hidden">save to cloud</span>
			<SaveToCloudSvg />
		</button>
	);
};
