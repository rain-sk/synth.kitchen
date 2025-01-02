import React from 'react';
import { IAudioParam } from 'standardized-audio-context';
import { NumberBox } from './number-box';
import { ParameterConnector } from './parameter-connector';

export const NumberParameter: React.FunctionComponent<{
	moduleKey: string;
	name: string;
	paramAccessor?: () => IAudioParam;
	value: number;
	commitValueCallback: (newValue: number) => void;
}> = ({ moduleKey, paramAccessor, name, value, commitValueCallback }) => {
	return (
		<section className="numparam">
			{paramAccessor && (
				<ParameterConnector
					moduleKey={moduleKey}
					name={name}
					accessor={paramAccessor}
				/>
			)}

			<NumberBox
				name={name}
				value={value}
				commitValueCallback={commitValueCallback}
			/>
		</section>
	);
};
