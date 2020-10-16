import { IModule } from '../components/modules/BaseModuleOld';
import { audio, mainBussKey } from '../io/audio-context';

const map = new Map<string, IModule>();

export const modules = {
	all: () => {
		return Array.from(map).filter(([, { moduleKey }]) => moduleKey !== 'GLOBAL_CONTEXT');
	},
	get: (key: string): IModule | undefined => {
		const module = map.get(key);
		if (module !== undefined) {
			return module;
		}
		console.error(new ReferenceError('no module'));
		return undefined;
	},
	set: (key: string, module: IModule) => {
		map.set(key, module);
	},
	size: () => {
		return map.size;
	},
	delete: (key: string) => {
		map.delete(key);
	}
};

modules.set('GLOBAL_CONTEXT', {
	moduleKey: 'GLOBAL_CONTEXT',
	type: 'GLOBAL_CONTEXT',
	initialized: true,
	node: audio.node(mainBussKey),
	connectors: [
		{
			id: 'GLOBAL_CONTEXT',
			name: 'speakers',
			type: 'SIGNAL_IN',
			getter: () => audio.node(mainBussKey)
		}
	]
});
