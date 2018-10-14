import { IAction, IContract, IOContract, ISynthKitchen, IIONode, ConnectionContract, IIOConnection, IOType } from '../../declarations';

export const IO_TRIGGER: IContract = {
  type: IOContract.TRIGGER,
  reduce: (action: IAction<IIONode>, state: ISynthKitchen): ISynthKitchen => {
    if (action.type === IO_TRIGGER.type && !!action.payload) {
      if (state.ioContext[0] && !!state.ioContext[1] && !!state.ioContext[2]) { // if ioContext is active
        let sourceId;
        let destinationId;
        if (state.ioContext[2] === IOType.SOURCE) {
          sourceId = state.ioContext[1];
          destinationId = action.payload.id;
        } else {
          sourceId = action.payload.id;
          destinationId = state.ioContext[1];
        }
        const sourceNode = state.ioNodes.get(sourceId);
        const destinationNode = state.ioNodes.get(destinationId);
        if (!!sourceNode && !!destinationNode) {
          const source = sourceNode[0];
          const destination = destinationNode[0];
          const dispatchConnect: IAction<IIOConnection> = {
            type: ConnectionContract.CONNECT,
            payload: {
              source,
              destination
            }
          };
          state.dispatchLoop.push(dispatchConnect)
        }
      } else if (action.payload.id !== state.ioContext[1]) {
        state.ioContext = [false, action.payload.id, action.payload.io.types[0]];
      }
      else {
        state.ioContext = [false, undefined, undefined];
      }
    }
    return state;
  }
}
