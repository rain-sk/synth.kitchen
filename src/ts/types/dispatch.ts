import { Action } from './action';

export interface Dispatch<T extends string> {
    action: Action<T>,
    payload?: any
}