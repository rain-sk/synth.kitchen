import { useCallback } from 'react';
import { useStateContext } from '../../hooks/use-state-context';
import { useDispatchContext } from '../../hooks/use-dispatch-context';
import { deselectAllModulesAction } from '../../state/actions/select-module';
import { changeNameAction } from '../../state/actions/change-name';

export const PatchNameField = () => {
	const { name } = useStateContext();
	const dispatch = useDispatchContext();

	const handleNameChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			dispatch(changeNameAction(e.target.value));
		},
		[dispatch, changeNameAction],
	);

	const handleFocus = useCallback(() => {
		dispatch(deselectAllModulesAction());
	}, [dispatch, deselectAllModulesAction]);

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
