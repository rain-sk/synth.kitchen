import { IAction, IContract, ISynthKitchen, ConnectionContract, IIOConnection, IIONode, MapNode } from '../../declarations';
import { guid } from 'src/ts/guid';

const update = (map: Map<string, MapNode>, id: string, node: [IIONode, string[]], hash: string): void => {
  map.set(id, [node[0], !!node[1] ? [...node[1], hash] : [hash]]);
};

const connect = (payload: IIOConnection, state: ISynthKitchen): ISynthKitchen => {
  const connectionId = guid();
  const destination = state.ioNodes.get(payload.destinationId);
  const source = state.ioNodes.get(payload.sourceId);
  if (!!destination && !!source) {
    try {
      // connect nodes on audio graph
      const srcAcc = source[0].io.accessor;
      const dstAcc = destination[0].io.accessor;
      const src = !!srcAcc ? source[0].io.target[srcAcc] : source[0].io.target;
      const dst = !!dstAcc ? destination[0].io.target[dstAcc] : destination[0].io.target;

      if ('connect' in src) {
        src.connect(dst);
        // add reference to the new connection
        update(state.ioNodes, payload.destinationId, destination, connectionId);
        update(state.ioNodes, payload.sourceId, source, connectionId);
        state.ioConnections.set(connectionId, payload);
      } else {
        throw new TypeError(`property 'connect' does not exist on source: ${src}`);
      }
    } catch (e) {
      console.error(e);
    }
    state.ioContext = [false, undefined, undefined];
  } else {
    console.error("Invalid attempt to connect an unregistered node.");
  }
  return state
};

export const CONNECTION_CONNECT: IContract = {
  type: ConnectionContract.CONNECT,
  reduce: (action: IAction<IIOConnection>, state: ISynthKitchen): ISynthKitchen => {
    if (action.type === CONNECTION_CONNECT.type && !!action.payload) {
      console.log(action);
      return connect(action.payload, state);
    }
    return state;
  }
}
