import { EventEmitter } from "events";

export enum ModuleType {
    OSCILLATOR = 'OSCILLATOR',
    GAIN = 'GAIN',
    DELAY = 'DELAY',
    FILTER = 'FILTER'
}

export interface IModuleDefinition {
    type: ModuleType;
    serializedState?: any;
}

export class Module extends EventEmitter {
    constructor(private type: ModuleType, serializedState?: any) {
        super();
        if (serializedState) {
            console.log(serializedState);
        }
        this.init();
    }

    init() {
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
