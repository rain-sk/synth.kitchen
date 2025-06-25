import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { IModule } from '../../state/types/module';
import { recipeActions } from '../../state/actions';
import { RecipeContext } from '../../contexts/recipe';

export const ModuleHeader: React.FC<{ module: IModule }> = ({ module }) => {
	const { focusedInput, dispatch } = useContext(RecipeContext);

	const editRef = useRef<HTMLInputElement>(null);

	const [edit, setEdit] = useState(false);
	const [name, setName] = useState(module.name);

	const handleFocusHeader = useCallback(() => {
		setEdit(true);
	}, [setEdit]);

	const editingRef = useRef(false);
	useEffect(() => {
		if (edit && !editingRef.current && focusedInput !== module.moduleKey) {
			editingRef.current = true;
			editRef.current?.focus();
			editRef.current?.setSelectionRange(0, name.length);
		} else if (!edit && focusedInput) {
			editingRef.current = false;
		}
	}, [focusedInput, edit, name]);

	const onFocus = useCallback(() => {
		dispatch(recipeActions.focusInputAction(module.moduleKey));
	}, []);

	const cancel = useCallback(() => {
		setEdit(false);
		setName(module.name);
		dispatch(recipeActions.blurInputAction());
	}, [setEdit, setName, module.name]);

	const handleNameChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setName(e.target.value);
		},
		[setName],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'Escape') {
				cancel();
			} else if (e.key === 'Enter') {
				dispatch(
					recipeActions.updateModuleAction(module.moduleKey, {
						name: name.trim(),
					}),
				);
				setEdit(false);
			}
		},
		[cancel, dispatch, module.moduleKey, name, setEdit],
	);

	return (
		<h2
			tabIndex={0}
			onFocus={handleFocusHeader}
			onMouseDown={(e) => {
				e.preventDefault();
			}}
			onDoubleClick={handleFocusHeader}
		>
			{edit ? (
				<>
					<label
						htmlFor={`rename_${module.moduleKey}`}
						className="visually-hidden"
					>
						rename
					</label>
					<input
						ref={editRef}
						type="text"
						name="rename"
						id={`rename_${module.moduleKey}`}
						value={name}
						onChange={handleNameChange}
						onFocus={onFocus}
						onBlur={cancel}
						onKeyDown={handleKeyDown}
					/>
				</>
			) : (
				name
			)}
		</h2>
	);
};
