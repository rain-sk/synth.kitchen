import * as React from 'react';
import { masterBuss } from '../../io/audio-context';
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

export const MasterBuss: React.FunctionComponent<IModuleProps> = props => {
  const [inputId] = React.useState(uniqueId() as any);

  React.useEffect(() => {
    modules.set('_master_buss_', {
      moduleKey: '_master_buss_',
      type: 'GAIN',
      connectors: [
        {
          id: inputId,
          name: 'input',
          type: 'CV_IN',
          getter: () => masterBuss
        }
      ]
    })
  }, []);

  return (
    <>
      <h2 className="visually-hidden">master buss</h2>
      <Parameter
        name="master buss"
        moduleKey="__master_buss__"
        id={inputId}
        type={'CV_IN'} />
    </>
  );
};
