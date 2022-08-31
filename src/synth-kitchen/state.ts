import React from "react";
import { ModuleType } from "../synth-kitchen-old/state/patch";

export type IModule = {
    key: string;
    type: ModuleType;
}

export type IState = {
    modules: {
        [key: string]: IModule;
    }
}

export const initialState: IState = { modules: { abc: { key: 'abc', type: 'DELAY' } } };

export const AppContext = React.createContext<IState>(initialState);

export const reducer = () => {
    return initialState;
}
