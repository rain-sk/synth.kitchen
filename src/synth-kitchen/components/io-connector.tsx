import React, { useCallback, useContext, useState } from 'react';

import { useEffectOnce } from '../hooks/use-effect-once';

import { IAudioContext, IAudioNode } from 'standardized-audio-context';
import { IoType, ioKey } from '../state/types/io';
import { ConnectionContext } from '../contexts/connection';

export const IoConnector: React.FunctionComponent<{
	moduleKey: string;
	channel: number;
	type: IoType;
	accessor: () => IAudioNode<IAudioContext>;
}> = ({ moduleKey, type, channel, accessor }) => {
	const [connectorKey] = useState(() => ioKey({ moduleKey, channel, type }));

	const {
		activeConnectorKey,
		connectedToActiveConnector,
		clickConnector,
		highlightInputs,
		highlightOutputs,
		registerConnector,
		unregisterConnector
	} = useContext(ConnectionContext);

	useEffectOnce(() => {
		registerConnector({ moduleKey, channel, type, accessor });

		return () => {
			unregisterConnector({ moduleKey, channel, type, accessor });
		};
	});

	const onClick = useCallback(() => {
		clickConnector({ moduleKey, type, channel, accessor });
	}, [clickConnector, moduleKey, type, channel, accessor]);

	const isActive = activeConnectorKey === connectorKey;
	const isConnectedToActiveConnector =
		connectedToActiveConnector.includes(connectorKey);
	const highlight =
		!isActive && (type === IoType.input ? highlightInputs : highlightOutputs);

	return (
		<button
			id={connectorKey}
			type="button"
			onClick={onClick}
			className={
				isActive
					? 'active'
					: isConnectedToActiveConnector
					? 'connected'
					: highlight
					? 'highlight'
					: ''
			}
		>
			o
		</button>
	);
};
