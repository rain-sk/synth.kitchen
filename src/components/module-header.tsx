import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatchContext } from '../hooks/use-dispatch-context';
import { IModule } from '../state/types/module';
import { actions } from '../state/actions';

export const ModuleHeader: React.FC<{ module: IModule }> = ({ module }) => {
	const dispatch = useDispatchContext();

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
			dispatch(actions.disableKeyMovementAction());
		} else if (!edit) {
			dispatch(actions.enableKeyMovementAction());
			editingRef.current = false;
		}
	}, [edit, name]);

	const cancel = useCallback(() => {
		setEdit(false);
		setName(module.name);
	}, [setEdit, setName, module.name]);

	const handleNameChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setName(e.target.value);
		},
		[setName]
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'Escape') {
				cancel();
			} else if (e.key === 'Enter') {
				dispatch(
					actions.updateModuleAction(module.moduleKey, { name: name.trim() })
				);
				setEdit(false);
			}
		},
		[module.moduleKey, setEdit, cancel, name]
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
