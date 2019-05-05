import { State } from '../../state';
import { ModuleType, createModule } from '../../state/module-factories';

export const AddModule = (state: State, payload: { track: number, type: ModuleType }): State => {

    if (payload) {
        // create props
        const newModule = createModule(payload.type);

        // add to map
        if (newModule) {
            const { moduleMap, modules } = state;
            moduleMap.set(newModule.id, newModule);
            if (modules[payload.track]) {
                modules[payload.track].push(newModule.id);
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