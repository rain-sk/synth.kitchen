import React, { useContext } from 'react';

import { actions } from '../state/actions';
import { IPatch } from '../state/types/patch';
import { KeyCode } from '../constants/key';
import { useDispatchContext } from '../hooks/use-dispatch-context';
import { useStateContext } from '../hooks/use-state-context';
import { ConnectionContext } from '../contexts/connection';
import { Record } from './record';

export const Toolbar: React.FC<{}> = () => {
	const dispatch = useDispatchContext();
	const state = useStateContext();
	const { connections } = useContext(ConnectionContext);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(actions.changeNameAction(e.target.value));
	};

	// https://code.tutsplus.com/tutorials/how-to-save-a-file-with-javascript--cms-41105
	const onSave = () => {
		const tempAnchor = document.createElement('a');

		const patch: IPatch = {
			modules: state.modules,
			name: state.name,
			connections: Object.fromEntries(connections.entries())
		};

		const blob = new Blob([JSON.stringify(patch)], {
			type: 'text/json'
		});

		tempAnchor.setAttribute('href', URL.createObjectURL(blob));
		tempAnchor.setAttribute('download', `${state.name}.json`);
		tempAnchor.click();

		URL.revokeObjectURL(tempAnchor.href);
	};

	// https://researchhubs.com/post/computing/javascript/open-a-local-file-with-javascript.html
	const onLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = (e.target as any).files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.onload = (e) => {
			dispatch(actions.loadPatchAction({ modules: {}, name: '' }));
			const patch = JSON.parse((e.target as any).result) as IPatch;
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

	return (
		<nav>
			<section>
				<input
					aria-label="patch name"
					type="text"
					value={state.name}
					onChange={handleNameChange}
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
