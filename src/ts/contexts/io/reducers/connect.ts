import { IoState } from '../state';
import { guid } from '../../../utils/guid';

export const IoConnect = (state: IoState, payload: [string, string]): IoState => {
    const [first, second] = payload;
    const firstNode = state.ioNodes.get(first);
    const secondNode = state.ioNodes.get(second);
    const firstConnections = state.outerMap.get(first);
    const secondConnections = state.outerMap.get(second);
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
                const source = firstIsSource ? first : second;
                const target = firstIsSource ? second : first;
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
    return {
        ...state
    };
};