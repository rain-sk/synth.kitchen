import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as webmidi from 'webmidi';

import './main.css';

import { Kitchen } from './synth-kitchen/kitchen';

const appRoot = document.getElementById('root') as HTMLElement;

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

export const webmidiEnabled = () => _webmidiEnabled;

console.log('hi!');