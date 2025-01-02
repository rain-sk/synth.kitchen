import { useCallback, useContext } from 'react';
import { ISerializedPatch } from '../../state/types/serialized-patch';
import { ConnectionContext } from '../../contexts/connection';
import { SaveToDiskSvg } from './svg';
import { usePatch } from '../../../hooks/use-patch';

export const SaveToDisk = () => {
	const { id, name, modules, modulePositions } = usePatch();
	const { connections, connectionCount } = useContext(ConnectionContext);

	const onDownload = useCallback(() => {
		const patch: ISerializedPatch = {
			id: id,
			name: name,
			modules: modules,
			modulePositions: modulePositions,
			connections: Object.fromEntries(connections.entries()),
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
	}, [name, modules, modulePositions, connectionCount]);

	return (
		<button type="button" onClick={onDownload}>
			<span className="visually-hidden">save to disk</span>
			<SaveToDiskSvg />
		</button>
	);
};
