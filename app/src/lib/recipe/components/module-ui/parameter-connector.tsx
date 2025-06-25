import React, { useContext, useEffect, useMemo, useState } from 'react';

import { IParameter, paramKey } from '../../state/types/parameter';
import { RecipeContext } from '../../contexts/recipe';
import { recipeActions } from '../../state/actions';
import { DerivedConnectionStateContext } from '../../contexts/derived-connection-state';

export const ParameterConnector: React.FunctionComponent<IParameter> = ({
	moduleKey,
	name,
	accessor,
}) => {
	const [connectorKey] = useState(() => paramKey({ moduleKey, name }));

	const { activeConnectorKey, dispatch } = useContext(RecipeContext);
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
			recipeActions.registerConnectorAction({
				moduleKey,
				name,
				accessor,
			}),
		);
	}, []);

	const onClick = () => {
		dispatch(recipeActions.clickConnectorAction({ moduleKey, name, accessor }));
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
