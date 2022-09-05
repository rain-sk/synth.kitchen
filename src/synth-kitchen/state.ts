import React, { useContext } from "react";
import { ModuleType } from "../synth-kitchen-old/state/patch";

export type IModuleState = {
    GLOBAL_CONTEXT: {};
    GAIN: {};
    DELAY: {};
    FILTER: {};
    OSCILLATOR: {
        frequency: number;
        detune: number;
        waveform: 'sine' | 'square' | 'triangle' | 'sawtooth' | 'custom';
    };
    SEQUENCER: {
		mode: 'forward' | 'backward';
		steps: {
			offset: number;
			duration: number;
		}[];
	};
    MIDI_DEVICE: {};
    MIDI_OSCILLATOR: {};
}

export type IModule<T extends ModuleType = ModuleType> = {
    moduleKey: string;
    type: T;
    x: number;
    y: number;
    state?: IModuleState[T];
}

export type IState = {
    modules: {
        [key: string]: IModule;
    }
}

export const initialState: IState = {
    modules: {
        abc: {
            moduleKey: 'abc',
            type: 'DELAY',
            x: Math.round(Math.random() * 800),
            y: Math.round(Math.random() * 800),
        },
        def: {
            moduleKey: 'def',
            type: 'FILTER',
            x: Math.round(Math.random() * 800),
            y: Math.round(Math.random() * 800),
        },
        '123': {
            moduleKey: '123',
            type: 'OSCILLATOR',
            x: Math.round(Math.random() * 800),
            y: Math.round(Math.random() * 800),
        }
    }
};

export const AppContext = React.createContext<IState>(initialState);

export type IUpdateModulePositionAction = {
    type: 'UpdateModulePosition';
    payload: {
        moduleKey: string;
        x: number;
        y: number;
    };
};

export type IUpdateModuleState = {
    type: 'UpdateModuleState';
    payload: {
        moduleKey: string;
        state: IModuleState[keyof IModuleState];
    };
};

export type IAction = IUpdateModulePositionAction | IUpdateModuleState;

export const reducer = (state: IState, action: IAction) => {
    const newState = (() => {
    switch (action.type) {
        case 'UpdateModulePosition': {
            return {
                ...state,
                modules: {
                    ...state.modules,
                    [action.payload.moduleKey]: {
                        ...state.modules[action.payload.moduleKey],
                        x: action.payload.x,
                        y: action.payload.y,
                    },
                },
            };
        }
        case 'UpdateModuleState': {
            return {
                ...state,
                modules: {
                    ...state.modules,
                    [action.payload.moduleKey]: {
                        ...state.modules[action.payload.moduleKey],
                        state: action.payload.state,
                    },
                },
            };
        }
        default: {
            return state;
        }
    }})();
    console.log(newState);
    return newState;
};

export const DispatchContext = React.createContext<React.Dispatch<IAction>>(() => {});

export const useDispatch = () => {
    return useContext(DispatchContext);
}
