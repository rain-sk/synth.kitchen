import * as React from 'react';
import { IIO, IDispatch } from '../declarations';
import { IO } from '.';

export interface IInputWrapper extends IDispatch {
  inputs?: IIO[];
}

export const InputWrapper = (props: IInputWrapper) =>
  <div>
    {
      props.inputs
        ? props.inputs.map((input, _) => {
          return <IO key={_} {...input} dispatch={props.dispatch} />
        })
        : null
    }
  </div>
