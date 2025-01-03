import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { IAudioContext, IAudioNode } from 'standardized-audio-context';

import { ConnectionContext } from '../../contexts/connection';
import { IoType, ioKey } from '../../state/types/connection';
import { PatchContext } from '../../contexts/patch';
import { useDerivedConnectorState } from '../../hooks/useDerivedConnectorState';

export const IoConnector: React.FunctionComponent<{
	name: string;
	moduleKey: string;
	channel: number;
	type: IoType;
	accessor: () => IAudioNode<IAudioContext>;
}> = ({ name, moduleKey, type, channel, accessor }) => {
	const [connectorKey] = useState(() => ioKey({ moduleKey, channel, type }));

	const { activeConnectorKey } = useContext(PatchContext);
	const { clickConnector, registerConnector, unregisterConnector } =
		useContext(ConnectionContext);
	const [
		{
			activeConnectorIsInput,
			activeConnectorIsOutput,
			connectedToActiveConnector,
		},
	] = useDerivedConnectorState();
	const highlightOutputs = activeConnectorIsInput;
	const highlightInputs = activeConnectorIsOutput;
	const isConnectedToActiveConnector = useMemo(
		() => connectedToActiveConnector.has(connectorKey),
		[connectedToActiveConnector],
	);

	useEffect(() => {
		registerConnector({ moduleKey, channel, type, accessor });

		return () => {
			unregisterConnector({ moduleKey, channel, type, accessor });
		};
	}, []);

	const onClick = useCallback(() => {
		clickConnector({ moduleKey, type, channel, accessor });
	}, [clickConnector, moduleKey, type, channel, accessor]);

	const isInput = type === IoType.input;
	const isActive = activeConnectorKey === connectorKey;

	const highlight = !isActive && (isInput ? highlightInputs : highlightOutputs);

	const roleDescription = useMemo(
		() => `${isInput ? 'input' : 'output'} connector`,
		[isInput],
	);

	return (
		<span className="io">
			{!isInput && <p>{name}</p>}
			<button
				aria-label={name}
				aria-roledescription={roleDescription}
				id={connectorKey}
				type="button"
				onClick={onClick}
				className={`connector ${
					isActive
						? 'active'
						: isConnectedToActiveConnector
						? 'connected'
						: highlight
						? 'highlight'
						: ''
				}`}
			/>
			{isInput && <p>{name}</p>}
		</span>
	);
};
