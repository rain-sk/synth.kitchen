// import { Module, IModuleDefinition } from "./module-base";
// import { ModuleType, IConnector } from "./patch";
// import { audioContext } from "../io/audio-context";

// const scaleDelay = (normalizedValue: number): number => {
//     return Math.min(100, Math.max(0, normalizedValue * 100));
// }

// const displayDelay = (currentValue: number) => {
//     return Math.round(currentValue * 100) / 100;
// }

// export class DelayModule extends Module {
//     constructor(public type: ModuleType, serializedState?: IModuleDefinition) {
//         super(type, serializedState);
//         this.name = 'delay';
//         this.nodes = {
//             delay: audioContext.createDelay()
//         };
//         this.input = {
//             id: `${this.moduleKey}_input`,
//             name: 'input',
//             type: 'SIGNAL_IN',
//             getter: () => this.nodes.delay
//         };
//         this.output = {
//             id: `${this.moduleKey}_output`,
//             name: 'output',
//             type: 'SIGNAL_OUT',
//             getter: () => this.nodes.delay
//         };
//         const delayTime: IConnector = {
//             id: `${this.moduleKey}_delayTime_cv`,
//             name: 'delay',
//             type: 'CV_IN',
//             getter: () => this.nodes.delay.delayTime
//         };
//         const handleChangeDelay = (newDelay: number) => {
//             (module as any).node.delayTime.value = newDelay;
//         }
//         this.controls = [
//             [/* delayTime knob */{
//                 connector: delayTime,
//                 parameter: {
//                     moduleKey: this.moduleKey,
//                     id: delayTime.id,
//                     name: delayTime.name,
//                     onChange: handleChangeDelay,
//                     display: displayDelay,
//                     scale: scaleDelay,
//                     value: 0,
//                     type: "CV_IN"
//                 }
//             }]
//         ];
//     }
// }
export const x = 0;