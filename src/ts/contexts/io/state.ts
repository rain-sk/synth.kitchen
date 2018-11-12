import { Dispatch } from '../../types/dispatch';
import { IoAction } from './actions';

export interface IoState {
    active: false | string;
    pair: [string | undefined, string | undefined];
    outerMap: Map<string, string[]>;
    innerMap: Map<string, [any, any]>;
    ioNodes: Map<string, any>;
    dispatchLoop: Dispatch<IoAction>[];
}

export const initialState: IoState = {
    active: false,
    pair: [undefined, undefined],
    outerMap: new Map<string, string[]>(),
    innerMap: new Map<string, [any, any]>(),
    ioNodes: new Map<string, any>(),
    dispatchLoop: []
};
