import * as React from 'react';
import { IModule } from '../interfaces';

export const Module = (props: IModule): JSX.Element => {
  return (
    <article
      //id={`module_${props.mod.type}`}
      className={`module key_${props.type} index_${props.index}`}>
      <p>{props.type}</p>
    </article>
  )
}
