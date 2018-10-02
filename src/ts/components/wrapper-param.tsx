import * as React from 'react';
import { IIO, IDispatch } from '../declarations';
import { IO } from './io';

export interface IParamWrapper extends IDispatch {
  params?: IIO[];
}

export const ParamWrapper = (props: IParamWrapper) =>
  <div className="params">
    {
      props.params
        ? props.params.map((param, _) => {
          return <IO key={_} {...param} dispatch={props.dispatch} />
        })
        : null
    }
  </div>;