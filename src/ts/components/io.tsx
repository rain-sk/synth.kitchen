import * as React from 'react';
import { IIo } from '../contexts/io/context';

const ID = '123';

export function Io(props: IIo): JSX.Element {
    const handleClick = () => {
        props.dispatch('IO_CLICK', ID);
    };
    console.log(props);
    return (
        <button onClick={handleClick}>call</button>
    );
}