import { ModuleAction } from './actions';

import { BaseState } from 'use-flux'
import { ModuleProps } from '../../components/module';
import { createOscillator } from './module-factories';

export interface ModuleState extends BaseState<ModuleAction> {
    moduleMap: Map<string, ModuleProps>;
    modules: string[][];
}

const moduleMap = new Map<string, ModuleProps>();
const osc = createOscillator();
moduleMap.set(osc.guid, osc);

export const initialState: ModuleState = {
    moduleMap,
    modules: [
        [
            osc.guid
        ]
    ],
    dispatchQueue: []
};
