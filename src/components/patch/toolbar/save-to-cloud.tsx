import { useCallback, useContext } from 'react';
import { ISerializedPatch } from '../../../state/types/serialized-patch';
import { useStateContext } from '../../../hooks/use-state-context';
import { ConnectionContext } from '../../../contexts/connection';
import { useApi } from '../../../hooks/use-api';
import { SaveToCloudSvg } from '../../svg/save-to-cloud';

export const SaveToCloud = () => {
	const { id, name, modules, modulePositions } = useStateContext();
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
