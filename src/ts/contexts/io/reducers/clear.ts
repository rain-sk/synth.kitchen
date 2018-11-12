import { IoState } from '../state';

export const IoClear = (state: IoState, payload: string): IoState => {
    const { dispatchLoop } = state;
    const connections = state.outerMap.get(payload);
    if (connections) {
        connections.forEach(connection => {
            state.outerMap.forEach((externalConnections, externalKey) => {
                externalConnections.forEach(externalConnection => {
                    if (connection === externalConnection) {
                        dispatchLoop.push({
                            action: {
                                type: 'IO_DISCONNECT'
                            },
                            payload: [payload, externalKey]
                        });
                    }
                });
            });
        });
    }
    return {
        ...state
    };
};