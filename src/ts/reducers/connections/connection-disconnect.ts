import { IAction, IContract, ISynthKitchen, ConnectionContract, IIOConnection } from '../../declarations';

// const update = (map: Map<string, MapNode>, id: string, node: MapNode, hash: string) => map.set(id, [node[0], !!node[1] ? [...node[1], hash] : [hash]]);

export const CONNECTION_DISCONNECT: IContract = {
  type: ConnectionContract.DISCONNECT,
  reduce: (action: IAction<IIOConnection>, state: ISynthKitchen): ISynthKitchen => {
    if (action.type === CONNECTION_DISCONNECT.type && !!action.payload) {
      const destination = state.ioNodes.get(action.payload.destination.id);
      const source = state.ioNodes.get(action.payload.source.id);
      if (!!destination && !!source) {

      }
      console.error("Invalid attempt to connect an unregistered node.");
    }
    return state;
  }
}
