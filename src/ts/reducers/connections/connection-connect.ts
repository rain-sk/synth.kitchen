import { IAction, IContract, ISynthKitchen, ConnectionContract, IIOConnection, IIONode, MapNode } from '../../declarations';
import { guid } from 'src/ts/guid';

const update = (map: Map<string, MapNode>, id: string, node: [IIONode, string[]], hash: string): void => {
  map.set(id, [node[0], !!node[1] ? [...node[1], hash] : [hash]]);
}

export const CONNECTION_CONNECT: IContract = {
  type: ConnectionContract.CONNECT,
  reduce: (action: IAction<IIOConnection>, state: ISynthKitchen): ISynthKitchen => {
    if (action.type === CONNECTION_CONNECT.type && !!action.payload) {
      const id = guid();
      const destination = state.ioNodes.get(action.payload.destination.id);
      const source = state.ioNodes.get(action.payload.source.id);
      if (!!destination && !!source) {
        let srcAcc = source[0].io.accessor;
        let dstAcc = destination[0].io.accessor;
        const src = !!srcAcc ? source[0].io.target[srcAcc] : source[0].io.target;
        const dst = !!dstAcc ? destination[0].io.target[dstAcc] : destination[0].io.target;
        src.connect(dst);
        update(state.ioNodes, action.payload.destination.id, destination, id);
        update(state.ioNodes, action.payload.source.id, source, id);
        state.ioConnections.set(id, action.payload);
        state.ioContext = [false, undefined, undefined];
        return state
      }
      console.error("Invalid attempt to connect an unregistered node.");
    }
    return state;
  }
}
