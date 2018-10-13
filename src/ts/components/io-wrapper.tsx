import * as React from 'react';
import { IIO, IDispatch } from '../declarations';
import { IO } from '.';
import { IOConsumer } from '../synth-kitchen';

export interface IIOWrapper extends IDispatch {
  name: string;
  io?: IIO[];
}

export const IOWrapper = (props: IIOWrapper) =>
  <IOConsumer>
    {
      context => (
        <span className={`io-list ${props.name}`}>
          {
            props.io
              ? props.io.map((io, _) => {
                return <IO key={_} {...io} dispatch={props.dispatch} context={context} />
              })
              : null
          }
        </span>
      )
    }
  </IOConsumer>
