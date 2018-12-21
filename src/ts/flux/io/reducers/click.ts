import { IoState } from '../state';

export const IoClick = (state: IoState, payload: string): IoState => {
    if (typeof payload === 'string') {
        if (!state.active) {
            return {
                ...state,
                dispatchQueue: [...state.dispatchQueue, { type: 'IO_ACTIVATE', payload }]
            };
        } else {
            if (state.active === payload) {
                return {
                    ...state,
                    dispatchQueue: [...state.dispatchQueue, { type: 'IO_DEACTIVATE' }]
                };
            }
            return {
                ...state,
                pair: [state.active, payload],
                dispatchQueue: [...state.dispatchQueue, { type: 'IO_PROCESS_PAIR' }]
            };
        }
    }
    return state;
};