import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './main.css';

import { Kitchen } from './synth-kitchen/kitchen';

const appRoot = document.getElementById('root') as HTMLElement;

ReactDOM.render(
    <Kitchen />,
    appRoot
);

