import { useCallback } from 'react';
import { patchActions } from '../../../state/actions';
import { usePatch } from '../../../hooks/use-patch';

export const PatchNameField = () => {
	const { name, dispatch } = usePatch();

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
