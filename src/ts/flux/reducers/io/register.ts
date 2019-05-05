import { State } from '../../state';

export const IoRegister = (state: State, payload: { id: string, node: any }): State => ({
    ...state,
    outerMap: state.outerMap.set(payload.id, []),
    ioNodes: state.ioNodes.set(payload.id, payload.node)
});
