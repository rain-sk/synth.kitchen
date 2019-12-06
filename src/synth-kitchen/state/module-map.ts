import { IModule } from '../ui/patch-module-old';
import { masterBuss } from '../io/utils/audio-context';

const map = new Map<string, IModule>();

export const modules = {
	get: (key: string): IModule => {
		const module = map.get(key);
		if (module !== undefined) {
			return module;
		}
		throw 'no module';
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
	node: masterBuss,
	connectors: [
		{
			id: 'GLOBAL_CONTEXT',
			name: 'speakers',
			type: 'SIGNAL_IN',
			getter: () => masterBuss
		}
	]
});
