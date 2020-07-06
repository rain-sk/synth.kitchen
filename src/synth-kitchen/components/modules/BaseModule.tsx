// import * as React from 'react';
// import { modules } from '../../state/module-map';
// import { Connector } from './shared/Connector';
// import { Module as ModuleState } from '../../state/module-base';
// import { Parameter } from './shared/Parameter';
// import { Setting } from './shared/Setting';

// export interface IModuleProps {
//     moduleKey: string;
//     removeModule: (moduleKey: string) => void;
// }

// export const BaseModule: React.FunctionComponent<IModuleProps> = ({ moduleKey, removeModule }) => {
//     const [mod] = React.useState(modules.get(moduleKey)) as any as [ModuleState];

//     const handleRemove = React.useCallback(() => {
//         removeModule(moduleKey);
//     }, [moduleKey]);

//     return (
//         <li className={mod.type === 'FILTER' ? 'double-wide' : ''}>
//             <button className="remove-module" type="button" onClick={handleRemove} aria-label="remove this module"></button>
//             <article className="module">
//                 <h2 className="visually-hidden">{mod.name}</h2>
//                 {mod.input.id ? (
//                     <Connector
//                         type="SIGNAL_IN"
//                         name="input"
//                         moduleKey={moduleKey}
//                         connectorId={mod.input.id} />
//                 ) : null}
//                 {mod.controls.map((column, keyOuter) => (
//                     <span className="module-control-column" key={keyOuter}>
//                         {column.map((control, keyInner) => (
//                             control.parameter ? (
//                                 <Parameter {...control.parameter} key={keyInner} />
//                             ) : control.setting ? (
//                                 <Setting {...control.setting} key={keyInner} />
//                             ) : null
//                         ))}
//                     </span>
//                 ))}
//                 {mod.output.id ? (
//                     <Connector
//                         {...mod.output}
//                         moduleKey={moduleKey}
//                         connectorId={mod.output.id} />
//                 ) : null}
//             </article>
//         </li>
//     );
// }
export const x = 0;