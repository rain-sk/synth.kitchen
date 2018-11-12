import * as React from 'react';
import { IoAction, IoReducers } from './actions';
import { IoState, initialState } from './state';

export const Io = React.createContext<[IoState, (action: IoAction, payload?: any) => void]>([initialState, (action: any) => {}]);

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
        let state = this.reduce(action, payload);
        this.setState({
            ...state
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
        return (
            <React.Fragment>
                <Io.Provider value={[this.state, this.dispatch]}>
                    {this.props.children}
                </Io.Provider>
            </React.Fragment>
        )
    }
}