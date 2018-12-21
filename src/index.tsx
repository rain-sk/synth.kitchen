import * as React from 'react';
import * as ReactDOM from 'react-dom';

/* Contexts */
import { FluxWrapper } from './ts/flux/flux-wrapper';
import { ContextWrapper } from './ts/contexts/context-wrapper';

/* Application Component */
import { SynthKitchen } from './ts/components/synth-kitchen';

import './main.css';

ReactDOM.render(
    <ContextWrapper>
        <FluxWrapper>
            <SynthKitchen />
        </FluxWrapper>
    </ContextWrapper>,
    document.getElementById('root') as HTMLElement
);
