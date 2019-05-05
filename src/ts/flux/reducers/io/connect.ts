import { State } from '../../state';
import { guid } from '../../../utils/guid';

export const IoConnect = (state: State): State => {
    const { activePrimary: active1, activeSecondary: active2 } = state;
    if (active1 && active2) {
        const firstNode = state.ioNodes.get(active1);
        const secondNode = state.ioNodes.get(active2);
        const firstConnections = state.outerMap.get(active1);
        const secondConnections = state.outerMap.get(active2);
        if (firstNode && secondNode && firstConnections && secondConnections) {
            let success = true;
            let firstIsSource = true;
            try {
                firstNode.connect(secondNode);
            } catch {
                try {
                    firstIsSource = false;
                    secondNode.connect(firstNode);
                } catch {
                    success = false;
                }
            } finally {
                if (success) {
                    const source = firstIsSource ? active1 : active2;
                    const target = firstIsSource ? active2 : active1;
                    const sourceNode = firstIsSource ? firstNode : secondNode;
                    const targetNode = firstIsSource ? secondNode : firstNode;
                    const sourceConnections = firstIsSource ? firstConnections : secondConnections;
                    const targetConnections = firstIsSource ? secondConnections : firstConnections;
                    const id = guid();
                    state.innerMap
                        .set(id, [sourceNode, targetNode]);
                    state.outerMap
                        .set(source, [...sourceConnections, id])
                        .set(target, [...targetConnections, id]);
                }
            }
        }
    }

    return {
        ...state
    };
};
