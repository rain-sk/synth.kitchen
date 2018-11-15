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
                dispatchStack: [...state.dispatchStack, { type: 'IO_DISCONNECT', payload: state.pair }]
            };
        } else {
            return {
                ...state,
                dispatchStack: [...state.dispatchStack, { type: 'IO_CONNECT', payload: state.pair }]
            };
        }
    }
    return {
        ...state
    };
}