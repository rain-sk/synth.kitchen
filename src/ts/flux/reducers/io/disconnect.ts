import { State } from '../../state';

export const IoDisconnect = (state: State, payload?: { id1: string, id2: string }): State => {
    const { outerMap, innerMap } = state;
    const { activePrimary, activeSecondary } = !payload
        ? state
        : {
            activePrimary: payload.id1,
            activeSecondary: payload.id2
        };

    if (activePrimary && activeSecondary) {


        // retreive node connection lists
        const firstConnections = outerMap.get(activePrimary);
        const secondConnections = outerMap.get(activeSecondary);
        if (firstConnections && secondConnections) {
            firstConnections.forEach((firstConnection, firstIndex) => {
                secondConnections.forEach((secondConnection, secondIndex) => {

                    // find matching connection
                    if (firstConnection === secondConnection) {
                        let success = true;
                        const [source, target] = innerMap.get(firstConnection);
                        if (source && target) {
                            try {
                                source.disconnect(target);
                            } catch {
                                success = false;
                            }
                        }
                        if (success) {
                            innerMap.delete(firstConnection);
                            firstConnections.splice(firstIndex);
                            secondConnections.splice(secondIndex);
                        }
                    }
                });
            });
            outerMap.set(activePrimary, [...firstConnections]);
            outerMap.set(activeSecondary, [...secondConnections]);
        }
    }
    return {
        ...state,
        innerMap,
        outerMap
    };
};
