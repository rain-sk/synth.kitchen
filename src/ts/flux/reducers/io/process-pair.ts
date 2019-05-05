import { State } from '../../state';
import { ioConnect } from '../../actions/io/connect';
import { ioDisconnect } from '../../actions/io/disconnect';

export function IoProcessPair(state: State): State {
    const { activePrimary: active1, activeSecondary: active2 } = state;
    if (active1 && active2) {
        const
            firstConnections = state.outerMap.get(active1),
            secondConnections = state.outerMap.get(active2);
        if (firstConnections &&
            secondConnections &&
            firstConnections.some(value => secondConnections.indexOf(value) >= 0)) {
            return {
                ...state,
                dispatchQueue: [...state.dispatchQueue, ioDisconnect()]
            };
        } else {
            return {
                ...state,
                dispatchQueue: [...state.dispatchQueue, ioConnect()]
            };
        }
    }
    return {
        ...state
    };
}
