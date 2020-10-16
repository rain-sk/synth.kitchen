import * as React from 'react';
import { audio, mainBussKey } from '../../io/audio-context';
import { IModuleProps } from './BaseModuleOld';
import { modules } from '../../state/module-map';
import { Parameter } from './shared/Parameter';
import { uniqueId } from '../../io/unique-id';

const scaleGain = (normalizedValue: number): number => {
  return Math.min(1, Math.max(0, normalizedValue));
}

const displayGain = (currentValue: number) => {
  return Math.round(currentValue * 1000) / 1000;
}

export const MainBuss: React.FunctionComponent<IModuleProps> = props => {
  const [inputId] = React.useState(uniqueId() as any);

  React.useEffect(() => {
    modules.set('_main_buss_', {
      moduleKey: '_main_buss_',
      type: 'GAIN',
      connectors: [
        {
          id: inputId,
          name: 'input',
          type: 'CV_IN',
          getter: () => audio.node(mainBussKey)
        }
      ]
    })
  }, []);

  return (
    <>
      <h2 className="visually-hidden">main buss</h2>
      <Parameter
        name="main buss"
        moduleKey="__main_buss__"
        id={inputId}
        type={'CV_IN'} />
    </>
  );
};
