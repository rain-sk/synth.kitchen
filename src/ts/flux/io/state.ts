import { IoAction } from './actions';

import { BaseState } from 'use-flux'

export interface IoState extends BaseState<IoAction> {
    active: false | string;
    pair: [string | undefined, string | undefined];
    outerMap: Map<string, string[]>;
    innerMap: Map<string, [any, any]>;
    ioNodes: Map<string, any>;
}

export const initialState: IoState = {
    active: false,
    pair: [undefined, undefined],
    outerMap: new Map<string, string[]>(),
    innerMap: new Map<string, [any, any]>(),
    ioNodes: new Map<string, any>(),
    dispatchQueue: []
};
