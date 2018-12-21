import { ModuleState } from '../state';
import { ModuleType, createModule } from '../module-factories';

export const AddModule = (state: ModuleState, payload: { track: number, type: ModuleType }): ModuleState => {

    if (payload) {
        // create props
        const newModule = createModule(payload.type);

        // add to map
        if (newModule) {
            const { moduleMap, modules } = state;
            moduleMap.set(newModule.guid, newModule);
            if (modules[payload.track]) {
                modules[payload.track].push(newModule.guid);
            }
            return ({
                ...state,
                moduleMap,
                modules
            });
        }
    }

    return state;
}