import React, { useEffect, useRef, useState } from 'react';
import { IRecipeAction, recipeActions } from '../../state/actions';
import { useLocation } from 'wouter';
import { blankRecipeToClearCanvas, blankRecipeToLoad } from '../../state';
import { IRecipeState } from '../../state/types/recipe';
import { connectorButtonExists, connectorKey } from '../../state/connection';
import { randomId } from '../../../../utils/random-id';

const doLoadConnections = (
	connectedConnectors: Set<string>,
	dispatch: React.Dispatch<IRecipeAction>,
) => {
	const connectorButtonsExist = [...connectedConnectors].every((key) =>
		connectorButtonExists(key),
	);
	if (connectorButtonsExist) {
		dispatch(recipeActions.loadConnectionsAction());
	} else {
		setTimeout(() => doLoadConnections(connectedConnectors, dispatch), 17);
	}
};

export const useLoadRecipe = (
	state: IRecipeState,
	dispatch: React.Dispatch<IRecipeAction>,
	id?: string,
) => {
	const { connections, connectors } = state;

	const [, navigate] = useLocation();
	// const { getRecipes } = useApi();
	const [loadConnections, setLoadConnections] = useState(false);

	const loadingRef = useRef(false);
	useEffect(() => {
		if (loadingRef.current) {
			return;
		}
		if (!id) {
			if (state.id === '') {
				loadingRef.current = true;
				const recipeId = randomId();
				dispatch(recipeActions.loadRecipeAction(blankRecipeToLoad(recipeId)));
				setLoadConnections(true);
				setTimeout(() => {
					loadingRef.current = false;
					navigate(`/recipe/${recipeId}`, { replace: true });
				}, 10);
			} else {
				setTimeout(() => {
					navigate(`/recipe/${state.id}`, { replace: true });
				}, 10);
			}
		}
	}, [id, state.id]);

	useEffect(() => {
		(async () => {
			if (
				id &&
				id.match(
					/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
				)?.length === 1 &&
				state.id !== id &&
				!loadingRef.current
			) {
				loadingRef.current = true;
				dispatch(recipeActions.loadRecipeAction(blankRecipeToClearCanvas()));

				// const { rows: recipes } = (await getRecipes().then((res) =>
				// 	res ? res.json() : { rows: [] },
				// )) as { rows: DatabaseRecipe[] };

				// const [recipe] = recipes
				// 	.filter((recipe) => recipe.ID === id)
				// 	.map((recipe) => JSON.parse(recipe.Recipe));

				setTimeout(() => {
					// dispatch(
					// 	recipeActions.loadRecipeAction(recipe ? recipe : blankRecipeToLoad(id)),
					// );
					navigate(`/recipe/${id}`, { replace: true });
					setLoadConnections(true);
					loadingRef.current = false;
				}, 50);
			}
		})();
	}, [id, state.id]);

	useEffect(() => {
		if (loadConnections) {
			const connectedConnectors = new Set<string>();
			Object.values(connections).forEach(([output, input]) => {
				connectedConnectors.add(connectorKey(output));
				connectedConnectors.add(connectorKey(input));
			});
			if (
				connectedConnectors.size > 0 &&
				[...connectedConnectors].every((key) => key in connectors)
			) {
				setLoadConnections(false);
				doLoadConnections(connectedConnectors, dispatch);
			}
		}
	}, [loadConnections, connections, connectors]);
};
