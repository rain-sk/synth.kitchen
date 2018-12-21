import { ModuleState } from '../state';
import { ModuleProps } from '../../../components/module';

export const ModuleRegister = (state: ModuleState, [name, props]: [string, ModuleProps]): ModuleState => {
    const { moduleMap } = state;
    moduleMap.set(name, props)
    return ({
        ...state,
        moduleMap
    });
}