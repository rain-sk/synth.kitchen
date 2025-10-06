import React from 'react';
import { IAudioParam } from 'standardized-audio-context';

import { NumberBox } from './number-box';
import { ParameterConnector } from './parameter-connector';

export const NumberParameter: React.FunctionComponent<{
	moduleId: string;
	name: string;
	legacyName?: string;
	paramAccessor?: () => IAudioParam;
	value: number;
	commitValueCallback: (newValue: number) => void;
}> = ({
	moduleId,
	paramAccessor,
	legacyName,
	name,
	value,
	commitValueCallback,
}) => {
	return (
		<section className="numparam" data-omit>
			{paramAccessor && (
				<ParameterConnector
					moduleId={moduleId}
					name={name}
					accessor={paramAccessor}
					legacyName={legacyName}
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
