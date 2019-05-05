import { State } from '../../state';
import { ioClear } from '../../actions';

export const RemoveModule = (state: State, payload: { track: number, row: number }): State => {
	const { modules, moduleMap } = state;

	const [removed] = modules[payload.track].splice(payload.row, 1);

	moduleMap.delete(removed);

	const remove = modules[payload.track][payload.row];

	const mod = moduleMap.get(remove);
	let ioNodes: string[] = [];

	if (!!mod) {
		ioNodes = ([
			...mod.inputs,
			...mod.mods,
			...mod.outputs,
			...mod.params
		]).map(p => p.guid);
	}

	const { dispatchQueue } = state;

	if (dispatchQueue) {
		ioNodes.forEach(node => {
			dispatchQueue.push(ioClear(node));
		})
	}

	return state;
}