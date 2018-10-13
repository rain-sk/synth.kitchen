import { IAction, IContract, ISynthKitchen, ConnectionContract, IIOConnection, IIONode, MapNode } from '../../declarations';
import { guid } from 'src/ts/guid';

const update = (map: Map<string, MapNode>, id: string, node: [IIONode, string[]], hash: string): void => {
  map.set(id, [node[0], !!node[1] ? [...node[1], hash] : [hash]]);
  console.log(node[0].io.target);
}

export const CONNECTION_CONNECT: IContract = {
  type: ConnectionContract.CONNECT,
  reduce: (action: IAction<IIOConnection>, state: ISynthKitchen): ISynthKitchen => {
    if (action.type === CONNECTION_CONNECT.type && !!action.payload) {
      const hash = guid();
      const destination = state.ioNodes.get(action.payload.destination.id);
      const source = state.ioNodes.get(action.payload.source.id);
      if (!!destination && !!source) {
        update(state.ioNodes, action.payload.destination.id, destination, hash);
        update(state.ioNodes, action.payload.source.id, source, hash);
        state.ioConnections.set(hash, action.payload);
        return state
      }
      console.error("Invalid attempt to connect an unregistered node.");
    }
    return state;
  }
}
