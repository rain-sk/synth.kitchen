import { useCallback, useContext } from 'react';

// import { ISerializedPatch } from '../../state/types/serialized-patch';
import { PatchContext } from '../../contexts/patch';
import { SaveToCloudSvg } from './svg/save-to-cloud';
import { useApi } from '../../api';
import { Patch } from 'synth.kitchen-shared';

export const SaveToCloud = () => {
	const { id, name, modules, modulePositions, connections } =
		useContext(PatchContext);

	const { savePatch } = useApi();

	const onSave = useCallback(() => {
		const patch: Partial<Patch> = {
			id,
			name,
			state: { state: { name, modules, modulePositions, connections } } as any,
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
