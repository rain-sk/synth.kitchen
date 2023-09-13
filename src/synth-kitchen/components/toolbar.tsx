import React /*, { useState }*/ from 'react';

import { actions } from '../state/actions';
import { IPatch } from '../state/types/patch';
import { KeyCode } from '../constants/key';
import { useDispatchContext } from '../hooks/use-dispatch-context';
import { useStateContext } from '../hooks/use-state-context';
import { AddModule } from './add-module';

export const Toolbar: React.FC<{}> = () => {
	const dispatch = useDispatchContext();
	const state = useStateContext();

	// const [zoom, setZoom] = useState(100);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(actions.historyPushAction());
		dispatch(actions.changeNameAction(e.target.value));
	};

	// https://code.tutsplus.com/tutorials/how-to-save-a-file-with-javascript--cms-41105
	const onSave = () => {
		const tempAnchor = document.createElement('a');

		const patch: IPatch = {
			modules: state.modules,
			name: state.name
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

	const handleUndo = () => {
		dispatch(actions.historyUndoAction());
	};

	const handleRedo = () => {
		dispatch(actions.historyRedoAction());
	};

	// const onChangeZoom: React.ChangeEventHandler<HTMLInputElement> = (e) => {
	// 	const newZoom = parseInt(e.target.value);
	// 	setZoom(newZoom);
	// 	const canvas = document.getElementById('module-canvas');
	// 	if (canvas) {
	// 		console.log(canvas);
	// 		canvas.style.transform = `scale(${newZoom / 100})`;
	// 	}
	// };

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
				<AddModule />
				<button
					type="button"
					onClick={handleUndo}
					disabled={
						!(
							state.patchHistory.length === 1 ||
							state.patchHistoryOffset + 1 < state.patchHistory.length
						)
					}
				>
					undo
				</button>
				<button
					type="button"
					onClick={handleRedo}
					disabled={state.patchHistoryOffset <= 0}
				>
					redo
				</button>
				{/* <input
					type="range"
					value={zoom}
					onChange={onChangeZoom}
					min={0}
					max={200}
				/> */}
			</section>
		</nav>
	);
};
