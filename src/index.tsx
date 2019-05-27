import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as webmidi from 'webmidi';

import './main.css';

import { App } from './synth-ui/app';

const appRoot = document.getElementById('root') as HTMLElement;

let _debugMode = window.location.hash === '#sk_debug';
let _webmidiEnabled = true;

webmidi.enable(function (err: string) {
    if (!!err) {
        _webmidiEnabled = false;
    }
    ReactDOM.render(
        <App />,
        appRoot
    );
});

export const debugMode = () => _debugMode;
export const webmidiEnabled = () => _webmidiEnabled;

console.log(debugMode());
