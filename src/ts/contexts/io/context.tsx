import * as React from 'react';
import { IoAction, IoReducers } from './actions';
import { IoState, initialState } from './state';

export interface IIo {
    state: IoState;
    dispatch: (action: IoAction, payload?: any) => void;
}

export const Io = React.createContext<IIo>({ state: initialState, dispatch: (action: any) => {} });

export class IoContext extends React.Component<{}, IoState> {
    constructor(props: any) {
        super(props);
        this.state = initialState;
        this.clearDispatchLoop = this.clearDispatchLoop.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }
    reduce(action: IoAction, payload?: any): IoState {
        let state = this.state;
        const reduce = IoReducers.get(action);
        if (reduce) {
            state = reduce(state, payload);
        }
        return state;
    }
    dispatch(action: IoAction, payload?: any) {
        console.log(`action: ${action}
        payload: `);
        console.log(payload);
        this.setState({
            ...this.reduce(action, payload)
        }, this.clearDispatchLoop);
    }
    clearDispatchLoop() {
        if (this.state.dispatchLoop.length) {
            let [next, ...dispatchLoop] = this.state.dispatchLoop;
            this.setState({
                dispatchLoop
            }, () => this.dispatch(next.action.type, next.payload));
        }
    }
    render() {
        const value = { state: this.state, dispatch: this.dispatch };
        console.log(value);
        return (
            <Io.Provider value={value}>
                {this.props.children}
            </Io.Provider>
        );
    }
}