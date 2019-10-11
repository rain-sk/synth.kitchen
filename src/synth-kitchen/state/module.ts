import { EventEmitter } from "events";
import { IAudioContext, IAudioNode } from "standardized-audio-context";
import { IConnector } from "../ui/patch-module";

const { v4 } = require("uuid");

export enum ModuleType {
    OSCILLATOR = 'OSCILLATOR',
    GAIN = 'GAIN',
    DELAY = 'DELAY',
    FILTER = 'FILTER'
}

export interface IModuleDefinition {
    moduleKey: string;
    type: ModuleType;
    connectors: IConnector[];
    // parameters: IParameter[] ???
}

export class Module implements IModuleDefinition {
    moduleKey = v4() as string;
    connectors = [];
    constructor(public type: ModuleType, serializedState?: IModuleDefinition) {
        this.init(serializedState);
    }

    init(serializedState?: IModuleDefinition) {
        if (serializedState) {
            console.log(serializedState);
        }
        switch (this.type) {
            case ModuleType.DELAY:
                break;
            case ModuleType.FILTER:
                break;
            case ModuleType.GAIN:
                break;
            case ModuleType.OSCILLATOR:
                break;
        }
    }
}
