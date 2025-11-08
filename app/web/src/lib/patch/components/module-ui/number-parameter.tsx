import React from 'react';
import { IAudioParam } from 'standardized-audio-context';

import { NumberBox } from './number-box';
import { ParameterConnector } from './parameter-connector';

export const NumberParameter: React.FunctionComponent<{
	moduleId: string;
	name: string;
	unit?: string;
	paramAccessor?: () => IAudioParam;
	value: number;
	commitValueCallback: (newValue: number) => void;
}> = ({ moduleId, paramAccessor, name, value, commitValueCallback, unit }) => {
	return (
		<section className="numparam" data-omit>
			{paramAccessor && (
				<ParameterConnector
					moduleId={moduleId}
					name={name}
					accessor={paramAccessor}
				/>
			)}

			<NumberBox
				name={name}
				value={value}
				commitValueCallback={commitValueCallback}
				unit={unit ?? ''}
			/>
		</section>
	);
};
