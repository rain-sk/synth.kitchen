import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as webmidi from 'webmidi';

import './main.css';

import { Kitchen } from './synth-kitchen/kitchen';

const appRoot = document.getElementById('root') as HTMLElement;

let _debugMode = window.location.hash === '#sk_debug';
let _webmidiEnabled = true;

webmidi.enable(function (err: string) {
    if (!!err) {
        _webmidiEnabled = false;
    }
    ReactDOM.render(
        <Kitchen />,
        appRoot
    );
});

export const debugMode = () => _debugMode;
export const webmidiEnabled = () => _webmidiEnabled;

if (debugMode()) console.log('debug mode');
