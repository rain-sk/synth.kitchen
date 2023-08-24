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
	const {
		activeConnectorKey,
		clickConnector,
		highlightInputs,
		highlightOutputs,
		registerConnector,
		unregisterConnector
	} = useContext(ConnectionContext);

	const [connectorKey] = useState(() => ioKey({ moduleKey, channel, type }));

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
	const highlight =
		!isActive && (type === IoType.input ? highlightInputs : highlightOutputs);

	return (
		<button
			id={connectorKey}
			type="button"
			onClick={onClick}
			className={isActive ? 'active' : highlight ? 'highlight' : ''}
		>
			o
		</button>
	);
};
