import { State } from '../../state';
import { ioDisconnect } from '../../actions';

export const IoClear = (state: State, payload?: { id: string }): State => {
    if (!!payload) {
        state.activePrimary = payload.id;
    }

    if (state.activePrimary) {
        const connections = state.outerMap.get(state.activePrimary);
        if (connections) {
            connections.forEach(connection => {
                state.outerMap.forEach((externalConnections, externalKey) => {
                    externalConnections.forEach(externalConnection => {
                        if (connection === externalConnection) {
                            state = {
                                ...state,
                                dispatchQueue: [...state.dispatchQueue, ioDisconnect()]
                            }
                        }
                    });
                });
            });
        }
    }
    return state;
};
