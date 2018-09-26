import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SynthKitchen } from './ts/SynthKitchen';

import './index.css';
import * as People from './test.json';

export const context = new AudioContext();

People.forEach((person: any) => {
  console.log(`${person}`);
});

ReactDOM.render(
  <SynthKitchen />,
  document.getElementById('root') as HTMLElement
);
