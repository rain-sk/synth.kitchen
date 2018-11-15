import * as React from 'react';
import { IoProvider } from '../contexts/io';

export const ContextWrapper: React.FunctionComponent = (props) => {
    return (
        <IoProvider>
            {props.children}
        </IoProvider>
    );
}