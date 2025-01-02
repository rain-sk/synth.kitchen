import { useCallback, useContext } from 'react';
import { ISerializedPatch } from '../../state/types/serialized-patch';
import { ConnectionContext } from '../../contexts/connection';
import { useApi } from '../../../hooks/use-api';
import { SaveToCloudSvg } from './svg/save-to-cloud';
import { PatchContext } from '../../contexts/patch';

export const SaveToCloud = () => {
	const { id, name, modules, modulePositions } = useContext(PatchContext);
	const { connections, connectionCount } = useContext(ConnectionContext);

	const { savePatch } = useApi();

	const onSave = useCallback(() => {
		const patch: ISerializedPatch = {
			id: id,
			name: name,
			modules: modules,
			modulePositions: modulePositions,
			connections: Object.fromEntries(connections.entries()),
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
