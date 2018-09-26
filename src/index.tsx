import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SynthKitchen } from './ts/SynthKitchen';

import './index.css';

export const context = new AudioContext();

ReactDOM.render(
  <SynthKitchen />,
  document.getElementById('root') as HTMLElement
);
