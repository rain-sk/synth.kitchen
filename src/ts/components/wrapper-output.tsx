import * as React from 'react';
import { IIO, IDispatch } from '../declarations';
import { IO } from './io';

export interface IOutputWrapper extends IDispatch {
  outputs?: IIO[];
}

export const OutputWrapper = (props: IOutputWrapper) =>
  <div>
    {
      props.outputs
        ? props.outputs.map((output, _) => {
          return <IO key={_} {...output} dispatch={props.dispatch} />
        })
        : null
    }
  </div>;