import { useCallback, useContext } from 'react';

import { ConnectionContext } from '../../contexts/connection';
import { connectionEntries } from '../../state/connection';
import { ISerializedPatch } from '../../state/types/serialized-patch';
import { PatchContext } from '../../contexts/patch';
import { SaveToCloudSvg } from './svg/save-to-cloud';
import { useApi } from '../../../api/use-api';

export const SaveToCloud = () => {
	const { id, name, modules, modulePositions } = useContext(PatchContext);
	const { connectionCount } = useContext(ConnectionContext);

	const { savePatch } = useApi();

	const onSave = useCallback(() => {
		const patch: ISerializedPatch = {
			id: id,
			name: name,
			modules: modules,
			modulePositions: modulePositions,
			connections: connectionEntries(),
		};
		savePatch(patch);
	}, [id, name, modules, modulePositions, connectionCount, savePatch]);

	return (
		<button type="button" onClick={onSave}>
			<span className="visually-hidden">save to cloud</span>
			<SaveToCloudSvg />
		</button>
	);
};
