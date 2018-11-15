import * as React from 'react';
import { IoList } from './components/io-list';
import { ContextWrapper } from './components/context-wrapper';
import { Test } from './components/test';

export const SynthKitchen: React.FunctionComponent = () => {
    return (
        <ContextWrapper>
            <Test />
            <IoList />
        </ContextWrapper>
    );
}
