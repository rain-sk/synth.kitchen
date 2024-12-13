import React, { useCallback, useContext } from 'react';

import { actions } from '../state/actions';
import { ISerializedPatch } from '../state/types/serialized-patch';
import { KeyCode } from '../constants/key';
import { useDispatchContext } from '../hooks/use-dispatch-context';
import { useStateContext } from '../hooks/use-state-context';
import { ConnectionContext } from '../contexts/connection';
import { Record } from './record';
import { deselectAllModulesAction } from '../state/actions/select-module';

export const Toolbar: React.FC<{}> = () => {
	const dispatch = useDispatchContext();
	const state = useStateContext();
	const { connections, connectionCount } = useContext(ConnectionContext);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(actions.changeNameAction(e.target.value));
	};

	const onSave = useCallback(() => {
		const patch: ISerializedPatch = {
			name: state.name,
			modules: state.modules,
			modulePositions: state.modulePositions,
			connections: Object.fromEntries(connections.entries()),
		};

		// https://code.tutsplus.com/tutorials/how-to-save-a-file-with-javascript--cms-41105
		{
			const a = document.createElement('a');
			const blob = new Blob([JSON.stringify(patch)], {
				type: 'text/json',
			});

			a.setAttribute('href', URL.createObjectURL(blob));
			a.setAttribute('download', `${state.name}.json`);
			a.click();

			URL.revokeObjectURL(a.href);
		}
	}, [state.name, state.modules, state.modulePositions, connectionCount]);

	// https://researchhubs.com/post/computing/javascript/open-a-local-file-with-javascript.html
	const onLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = (e.target as any).files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.onload = (e) => {
			dispatch(
				actions.loadPatchAction({
					name: '',
					modules: {},
					modulePositions: {},
					connections: {},
				}),
			);
			const patch = JSON.parse((e.target as any).result) as ISerializedPatch;
			setTimeout(() => {
				dispatch(actions.loadPatchAction(patch));
			}, 100);
		};
		reader.readAsText(file);
	};

	const handleLoadKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
		if (e.keyCode === KeyCode.ENTER || e.keyCode === KeyCode.SPACE) {
			e.preventDefault();
			(e.nativeEvent.target as any).querySelector('input').click();
		}
	};

	const handleFocus = useCallback(() => {
		dispatch(deselectAllModulesAction());
	}, [dispatch]);

	return (
		<nav>
			<section>
				<input
					aria-label="patch name"
					type="text"
					value={state.name}
					onChange={handleNameChange}
					onFocus={handleFocus}
				/>
				<button type="button" onClick={onSave}>
					save
				</button>
				<label id="load" tabIndex={0} onKeyDown={handleLoadKeyDown}>
					load
					<input type="file" onChange={onLoad} accept="text/json" />
				</label>
			</section>
			<section>
				<Record />
			</section>
		</nav>
	);
};
