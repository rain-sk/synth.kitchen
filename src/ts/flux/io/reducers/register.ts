import { IoState } from '../state';

export const IoRegister = (state: IoState, payload: [string, any]): IoState => ({
    ...state,
    outerMap: state.outerMap.set(payload[0], []),
    ioNodes: state.ioNodes.set(payload[0], payload[1])
});
