import React, { useCallback, useContext } from 'react';

import { actions } from '../state/actions';
import { ISerializedPatch } from '../state/types/serialized-patch';
import { KeyCode } from '../constants/key';
import { useDispatchContext } from '../hooks/use-dispatch-context';
import { useStateContext } from '../hooks/use-state-context';
import { ConnectionContext } from '../contexts/connection';
import { Record } from './record';
import { deselectAllModulesAction } from '../state/actions/select-module';
import { useApi } from '../hooks/use-api';

export const Toolbar: React.FC<{}> = () => {
	const dispatch = useDispatchContext();
	const state = useStateContext();
	const { connections, connectionCount } = useContext(ConnectionContext);
	const { savePatch } = useApi();

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(actions.changeNameAction(e.target.value));
	};

	const onSave = useCallback(() => {
		const patch: ISerializedPatch = {
			id: state.id,
			name: state.name,
			modules: state.modules,
			modulePositions: state.modulePositions,
			connections: Object.fromEntries(connections.entries()),
		};
		savePatch(patch);
	}, [
		state.name,
		state.modules,
		state.modulePositions,
		connectionCount,
		savePatch,
	]);

	const onDownload = useCallback(() => {
		const patch: ISerializedPatch = {
			id: state.id,
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
	const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = (e.target as any).files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.onload = (e) => {
			dispatch(
				actions.loadPatchAction({
					id: '',
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
				<button type="button" onClick={onDownload}>
					<span className="visually-hidden">download to disk</span>
					<svg
						role="presentation"
						width="25px"
						height="25px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12"
							stroke="#000000"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<label id="load" tabIndex={0} onKeyDown={handleLoadKeyDown}>
					<span className="visually-hidden">upload from disk</span>
					<svg
						role="presentation"
						width="25px"
						height="25px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M17 17H17.01M15.6 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H8.4M12 15V4M12 4L15 7M12 4L9 7"
							stroke="#ffffff"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<input type="file" onChange={onUpload} accept="text/json" />
				</label>
			</section>
			<section>
				<button type="button" onClick={onSave}>
					<span className="visually-hidden">save to cloud</span>
					<svg
						role="presentation"
						width="25px"
						height="25px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 21V11M12 11L9 14M12 11L15 14M7 16.8184C4.69636 16.2074 3 14.1246 3 11.6493C3 9.20008 4.8 6.9375 7.5 6.5C8.34694 4.48637 10.3514 3 12.6893 3C15.684 3 18.1317 5.32251 18.3 8.25C19.8893 8.94488 21 10.6503 21 12.4969C21 14.8148 19.25 16.7236 17 16.9725"
							stroke="#000000"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>

				<Record />
			</section>
		</nav>
	);
};
