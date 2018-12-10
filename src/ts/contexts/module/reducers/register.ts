import { ModuleState } from '../state';
import { ModuleProps } from 'src/ts/components/module';

export const ModuleRegister = (state: ModuleState, payload: [string, ModuleProps]): ModuleState => {
    const moduleMap = state.moduleMap;
    moduleMap.set(payload[0], payload[1])
    return ({
        ...state,
        moduleMap
    });
}