import React from 'react';
import { useDispatchContext } from '../contexts/dispatch';
import { useStateContext } from '../contexts/state';
import { actions } from '../state/actions';
import { IModule } from '../state/types/module';

export const Toolbar: React.FC<{}> = () => {
	const dispatch = useDispatchContext();
	const state = useStateContext();

	const onSave = () => {
		const tempAnchor = document.createElement('a');

		const blob = new Blob([JSON.stringify(state.modules)], {
			type: 'text/json'
		});

		tempAnchor.setAttribute('href', URL.createObjectURL(blob));
		tempAnchor.setAttribute('download', `untitled.json`);
		tempAnchor.click();

		URL.revokeObjectURL(tempAnchor.href);
	};

	const onLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = (e.target as any).files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.onload = (e) => {
			const modules = JSON.parse((e.target as any).result) as Record<
				string,
				IModule
			>;
			dispatch(actions.loadPatchAction({}));
			setTimeout(() => {
				dispatch(actions.loadPatchAction(modules));
			}, 10);
		};
		reader.readAsText(file);
	};

	return (
		<nav>
			<section></section>
			<section>
				<button type="button" onClick={onSave}>
					Save
				</button>
				<label id="load" tabIndex={0}>
					Load
					<input type="file" onChange={onLoad} />
				</label>
			</section>
		</nav>
	);
};
