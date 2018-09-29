import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SynthKitchen } from './ts/synth-kitchen';

import './index.css';

ReactDOM.render(
  <SynthKitchen />,
  document.getElementById('root') as HTMLElement
);
