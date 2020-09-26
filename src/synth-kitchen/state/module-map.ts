import { IModule } from '../components/modules/BaseModuleOld';
import { masterBuss } from './aud-io/audio-context';

const map = new Map<string, IModule>();

export const modules = {
	all: () => {
		return Array.from(map).filter(([, { moduleKey }]) => moduleKey !== 'GLOBAL_CONTEXT');
	},
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
