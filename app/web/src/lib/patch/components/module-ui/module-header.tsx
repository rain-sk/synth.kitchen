import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Module } from 'synth.kitchen-shared';

import { patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';

export const ModuleHeader: React.FC<{ module: Module }> = ({ module }) => {
	const { focusedInput, dispatch } = useContext(PatchContext);

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
		editRef.current?.select();
		dispatch(patchActions.focusInputAction(module.moduleKey));
	}, []);

	const cancel = useCallback(() => {
		setEdit(false);
		setName(module.name);
		dispatch(patchActions.blurInputAction());
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
					patchActions.updateModuleAction(module.moduleKey, {
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
						autoFocus
					/>
				</>
			) : (
				module.name
			)}
		</h2>
	);
};
