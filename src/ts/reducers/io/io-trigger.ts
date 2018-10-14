import { IAction, IContract, IOContract, ISynthKitchen, IIONode, ConnectionContract, IIOConnection, IOType, Reducer } from '../../declarations';

// functions

const handleConnection: Reducer<IIONode> = (payload: IIONode, state: ISynthKitchen): ISynthKitchen => {
  if (state.ioContext[0] && !!state.ioContext[1] && !!state.ioContext[2]) { // if ioContext is active
    let sourceId;
    let destinationId;
    if (state.ioContext[2] === IOType.SOURCE) {
      sourceId = state.ioContext[1];
      destinationId = payload.id;
    } else {
      sourceId = payload.id;
      destinationId = state.ioContext[1];
    }
    const source = state.ioNodes.get(sourceId);
    const destination = state.ioNodes.get(destinationId);
    if (!!source && !!destination) {
      let connectionExists = false;
      source[1].forEach(sCnxn => {
        destination[1].forEach(dCnxn => {
          if (sCnxn === dCnxn) connectionExists = true;
        });
      });
      if (connectionExists) {
        const connect: IAction<IIOConnection> = {
          type: ConnectionContract.DISCONNECT,
          payload: {
            sourceId,
            destinationId
          }
        };
        state.dispatchLoop.push(connect);
      } else {
        const disconnect: IAction<IIOConnection> = {
          type: ConnectionContract.CONNECT,
          payload: {
            sourceId,
            destinationId
          }
        };
        state.dispatchLoop.push(disconnect);
      }
    }
  } else if (payload.id !== state.ioContext[1]) {
    state.ioContext = [false, payload.id, payload.io.types[0]];
  }
  else {
    state.ioContext = [false, undefined, undefined];
  }
  return state;
}

//const clearContext: Reducer<IIONode> = null;


// exports

const type = IOContract.TRIGGER;

const reduce: Reducer<IAction<IIONode>> = (action: IAction<IIONode>, state: ISynthKitchen): ISynthKitchen => {
  if (action.type === IO_TRIGGER.type && !!action.payload) {
    return handleConnection(action.payload, state);
  }
  return state;
};

export const IO_TRIGGER: IContract = {
  type,
  reduce
}
