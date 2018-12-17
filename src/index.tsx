import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ContextWrapper } from './ts/contexts/context-wrapper';
import { SynthKitchen } from './ts/components/synth-kitchen';
import { GlobalOutput } from './ts/components/global-output';

import './main.css';

ReactDOM.render(
    <ContextWrapper>
        <SynthKitchen />
        <GlobalOutput />
    </ContextWrapper>,
    document.getElementById('root') as HTMLElement
);
