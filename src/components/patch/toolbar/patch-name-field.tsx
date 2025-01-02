import { useCallback } from 'react';
import { useStateContext } from '../../../hooks/use-state-context';
import { useDispatchContext } from '../../../hooks/use-dispatch-context';
import { patchActions } from '../../../state/actions';

export const PatchNameField = () => {
	const { name } = useStateContext();
	const dispatch = useDispatchContext();

	const handleNameChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			dispatch(patchActions.changeNameAction(e.target.value));
		},
		[dispatch],
	);

	const handleFocus = useCallback(() => {
		dispatch(patchActions.deselectAllModulesAction());
	}, [dispatch]);

	return (
		<input
			aria-label="patch name"
			type="text"
			value={name}
			onChange={handleNameChange}
			onFocus={handleFocus}
		/>
	);
};
