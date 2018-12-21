import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppComponent } from './ts/components/app';

import './main.css';

ReactDOM.render(
    <AppComponent />,
    document.getElementById('root') as HTMLElement
);
