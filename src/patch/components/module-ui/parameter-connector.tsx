import React, { useContext, useEffect, useMemo, useState } from 'react';

import { IParameter, paramKey } from '../../state/types/parameter';
import { PatchContext } from '../../contexts/patch';
import { patchActions } from '../../state/actions';
import { DerivedConnectionStateContext } from '../../contexts/derived-connection-state';

export const ParameterConnector: React.FunctionComponent<IParameter> = ({
	moduleKey,
	name,
	accessor,
}) => {
	const [connectorKey] = useState(() => paramKey({ moduleKey, name }));

	const { activeConnectorKey, dispatch } = useContext(PatchContext);
	const { activeConnectorIsOutput, connectedToActiveConnector } = useContext(
		DerivedConnectionStateContext,
	);
	const highlightInputs = activeConnectorIsOutput;
	const isConnectedToActiveConnector = useMemo(
		() => connectedToActiveConnector.has(connectorKey),
		[connectedToActiveConnector],
	);

	useEffect(() => {
		dispatch(
			patchActions.registerConnectorAction({
				moduleKey,
				name,
				accessor,
			}),
		);

		return () => {
			dispatch(
				patchActions.unregisterConnectorAction({
					moduleKey,
					name,
					accessor,
				}),
			);
		};
	}, []);

	const onClick = () => {
		dispatch(patchActions.clickConnectorAction({ moduleKey, name, accessor }));
	};

	const isActive = activeConnectorKey === connectorKey;
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
