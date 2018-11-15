import * as React from 'react';

import { IoState } from '../contexts/io/state';
import { IoAction } from '../contexts/io/actions';
import { IoContext } from '../contexts/io';
import { guid } from '../utils/guid';

export interface IIo {
    state: IoState;
    dispatch: (action: IoAction, payload?: any) => void;
}

export const Io: React.FunctionComponent = () => {
    const context = React.useContext(IoContext);
    const [id] = React.useState(guid());
    return (
        <button onClick={() => {context.dispatch({ type: 'IO_CLICK', payload: id })}}>click</button>
    );
}
