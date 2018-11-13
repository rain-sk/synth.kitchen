import { IoState } from '../state';

export function IoProcessPair(state: IoState): IoState {
    const [first, second] = state.pair;
    if (first && second) {
        const
            firstConnections = state.outerMap.get(first),
            secondConnections = state.outerMap.get(second);
        if (firstConnections &&
            secondConnections &&
            firstConnections.some(value => secondConnections.indexOf(value) >= 0)) {
            return {
                ...state,
                dispatchLoop: [...state.dispatchLoop, { action: { type: 'IO_DISCONNECT' }, payload: state.pair }]
            };
        } else {
            return {
                ...state,
                dispatchLoop: [...state.dispatchLoop, { action: { type: 'IO_CONNECT' }, payload: state.pair }]
            };
        }
    }
    return {
        ...state
    };
}