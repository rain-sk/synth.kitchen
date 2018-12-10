import { IoState } from '../state';

export const IoClick = (state: IoState, payload: string): IoState => {
    if (typeof payload === 'string') {
        if (!state.active) {
            return {
                ...state,
                dispatchStack: [...state.dispatchStack, { type: 'IO_ACTIVATE', payload }]
            };
        } else {
            if (state.active === payload) {
                return {
                    ...state,
                    dispatchStack: [...state.dispatchStack, { type: 'IO_DEACTIVATE' }]
                };
            }
            return {
                ...state,
                pair: [state.active, payload],
                dispatchStack: [...state.dispatchStack, { type: 'IO_PROCESS_PAIR' }]
            };
        }
    }
    return state;
};