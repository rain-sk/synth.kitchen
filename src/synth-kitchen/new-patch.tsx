import * as React from 'react';
import { Knob, KnobScale } from './components/controls/Knob';

export const NewPatch = () => {
	const [value, setValue] = React.useState(5);

	const dispatchValue = (newValue: number) => {
		console.log(newValue);
	};

	return (
		<>
			<Knob
				id="1"
				label="test"
				min={1}
				max={500}
				value={value}
				setValue={setValue}
				dispatchValue={dispatchValue}
			/>
		</>
	);
};
