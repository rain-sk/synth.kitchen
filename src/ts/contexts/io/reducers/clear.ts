import { IoState } from '../state';

export const IoClear = (state: IoState, payload: string): IoState => {
    const connections = state.outerMap.get(payload);
    if (connections) {
        connections.forEach(connection => {
            state.outerMap.forEach((externalConnections, externalKey) => {
                externalConnections.forEach(externalConnection => {
                    if (connection === externalConnection) {
                        state = {
                            ...state,
                            dispatchStack: [...state.dispatchStack, {
                                type: 'IO_DISCONNECT',
                                payload: [payload, externalKey]
                            }]
                        }
                    }
                });
            });
        });
    }
    return {
        ...state
    };
};