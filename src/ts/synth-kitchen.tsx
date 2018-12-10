import * as React from 'react';
import { IoInterface } from './components/io-interface';
import { ContextWrapper } from './components/context-wrapper';
import { Test } from './components/test';

export const SynthKitchen: React.FunctionComponent = () => {
    return (
        <ContextWrapper>
            <Test />
            <IoInterface />
        </ContextWrapper>
    );
}
