import { useCallback, useEffect, useRef, useState } from 'react';
import { IModule } from '../../../state/types/module';
import { patchActions } from '../../../state/actions';
import { usePatch } from '../../../hooks/use-patch';

export const ModuleHeader: React.FC<{ module: IModule }> = ({ module }) => {
	const { dispatch } = usePatch();

	const editRef = useRef<HTMLInputElement>(null);

	const [edit, setEdit] = useState(false);
	const [name, setName] = useState(module.name);

	const handleFocusHeader = useCallback(() => {
		setEdit(true);
	}, [setEdit]);

	const editingRef = useRef(false);
	useEffect(() => {
		if (edit && !editingRef.current) {
			editingRef.current = true;
			editRef.current?.focus();
			editRef.current?.setSelectionRange(0, name.length);
			dispatch(patchActions.disableKeyMovementAction());
		} else if (!edit) {
			dispatch(patchActions.enableKeyMovementAction());
			editingRef.current = false;
		}
	}, [dispatch, edit, name]);

	const cancel = useCallback(() => {
		setEdit(false);
		setName(module.name);
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
