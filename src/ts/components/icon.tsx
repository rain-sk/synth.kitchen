import * as React from 'react';
import { ModuleType } from '../declarations';

import osc from '../../svgs/oscillator_sine.svg';

const getIconSrc = (type: ModuleType) => {
  if (type === ModuleType.OSCILLATOR) return osc;
}

export interface IIcon {
  type: ModuleType;
}

export const Icon = (props: IIcon): JSX.Element | null => {
  return <img src={getIconSrc(props.type)} width="30" height="30" />;
}