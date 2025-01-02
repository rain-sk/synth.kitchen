import React, { useCallback, useContext, useMemo, useState } from 'react';
import { IAudioContext, IAudioNode } from 'standardized-audio-context';

import { IoType, ioKey } from '../../../state/types/io';
import { ConnectionContext } from '../../../contexts/connection';
import { useEffectOnce } from '../../../hooks/use-effect-once';

export const IoConnector: React.FunctionComponent<{
	name: string;
	moduleKey: string;
	channel: number;
	type: IoType;
	accessor: () => IAudioNode<IAudioContext>;
}> = ({ name, moduleKey, type, channel, accessor }) => {
	const [connectorKey] = useState(() => ioKey({ moduleKey, channel, type }));

	const {
		activeConnectorKey,
		connectedToActiveConnector,
		clickConnector,
		highlightInputs,
		highlightOutputs,
		registerConnector,
		unregisterConnector,
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

	const isInput = type === IoType.input;
	const isActive = activeConnectorKey === connectorKey;

	const isConnectedToActiveConnector =
		connectedToActiveConnector.includes(connectorKey);
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
