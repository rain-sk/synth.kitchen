import * as React from 'react';
import { IIO, IDispatch } from '../declarations';
import { IO } from '.';

export interface IModWrapper extends IDispatch {
  mods?: IIO[];
}

export const ModWrapper = (props: IModWrapper) =>
  <div>
    {
      props.mods
        ? props.mods.map((mod, _) => {
          return <IO key={_} {...mod} dispatch={props.dispatch} />
        })
        : null
    }
  </div>;