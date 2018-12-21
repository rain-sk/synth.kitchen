import { IoState } from '../state';

export const IoDisconnect = (state: IoState, payload: [string, string]): IoState => {
    const [first, second] = payload;
    const firstConnections = state.outerMap.get(first);
    const secondConnections = state.outerMap.get(second);
    if (firstConnections && secondConnections) {
        firstConnections.forEach((firstConnection, firstIndex) => {
            secondConnections.forEach((secondConnection, secondIndex) => {
                if (firstConnection === secondConnection) {
                    let success = true;
                    const [source, target] = state.innerMap.get(firstConnection);
                    if (source && target) {
                        try {
                            source.disconnect(target);
                        } catch {
                            success = false;
                        }
                    }
                    if (success) {
                        state.innerMap.delete(firstConnection);
                        firstConnections.splice(firstIndex);
                        secondConnections.splice(secondIndex);
                    }
                }
            });
        });
        state.outerMap.set(first, [...firstConnections]);
        state.outerMap.set(second, [...secondConnections]);
    }
    return {
        ...state
    };
};