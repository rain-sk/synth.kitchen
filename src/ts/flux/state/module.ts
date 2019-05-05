import { ModuleProps } from '../../components/module';
import { createOscillator } from './module-factories';

export interface ModuleState {
	moduleMap: Map<string, ModuleProps>;
	modules: string[][];
}

const moduleMap = new Map<string, ModuleProps>();
const osc = createOscillator();
moduleMap.set(osc.id, osc);

export const initialModuleState: ModuleState = {
	moduleMap,
	modules: [
		[
			osc.id
		]
	]
};
