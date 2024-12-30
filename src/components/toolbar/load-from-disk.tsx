import { KeyCode } from '../../constants/key';
import { useDispatchContext } from '../../hooks/use-dispatch-context';
import { loadPatchAction } from '../../state/actions/load-patch';
import { ISerializedPatch } from '../../state/types/serialized-patch';
import { OpenFromDiskSvg } from '../svg';

export const LoadFromDisk = () => {
	const dispatch = useDispatchContext();

	// https://researchhubs.com/post/computing/javascript/open-a-local-file-with-javascript.html
	const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = (e.target as any).files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.onload = (e) => {
			dispatch(
				loadPatchAction({
					id: '',
					name: '',
					modules: {},
					modulePositions: {},
					connections: {},
				}),
			);
			const patch = JSON.parse((e.target as any).result) as ISerializedPatch;
			setTimeout(() => {
				dispatch(loadPatchAction(patch));
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
		<label id="load" tabIndex={0} onKeyDown={handleLoadKeyDown}>
			<span className="visually-hidden">open from disk</span>
			<OpenFromDiskSvg />
			<input type="file" onChange={onUpload} accept="text/json" />
		</label>
	);
};
