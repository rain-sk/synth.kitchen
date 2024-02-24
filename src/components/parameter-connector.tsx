import React, { useCallback, useContext, useState } from 'react';
import { useEffectOnce } from '../hooks/use-effect-once';
import { IParameter, paramKey } from '../state/types/parameter';
import { ConnectionContext } from '../contexts/connection';

export const ParameterConnector: React.FunctionComponent<IParameter> = ({
	moduleKey,
	name,
	accessor
}) => {
	const [connectorKey] = useState(() => paramKey({ moduleKey, name }));

	const {
		activeConnectorKey,
		connectedToActiveConnector,
		clickConnector,
		highlightInputs,
		registerConnector,
		unregisterConnector
	} = useContext(ConnectionContext);

	useEffectOnce(() => {
		registerConnector({ moduleKey, name, accessor });

		return () => {
			unregisterConnector({ moduleKey, name, accessor });
		};
	});

	const onClick = useCallback(() => {
		clickConnector({ moduleKey, name, accessor });
	}, [clickConnector, moduleKey, name, accessor]);

	const isActive = activeConnectorKey === connectorKey;
	const isConnectedToActiveConnector =
		connectedToActiveConnector.includes(connectorKey);
	const highlight = highlightInputs;

	return (
		<button
			aria-label={name}
			aria-roledescription="parameter connector"
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
	);
};
