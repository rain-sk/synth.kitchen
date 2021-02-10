import * as React from 'react';
import { uniqueId } from '../../io/unique-id';

import knob from './Knob.module.css';

export enum KnobScale {
	Linear,
	LogE,
	Log10
}

interface KnobProps {
	id: string;
	label: string;
	min: number;
	max: number;
	// scale: KnobScale;
	value: number;
	setValue: (value: number) => void;
	dispatchValue: (value: number) => void;
}

const LINEAR_MIN = 0;
const LINEAR_MAX = 1;

const toFixedNumber = (number: number, decimals: number) => {
	const multdiv = 10 ** decimals;
	return Math.round(number * multdiv) / multdiv;
};

const normalizeValue = (scaledValue: number, min: number, max: number) => {
	// switch (scale) {
	// 	case KnobScale.Linear: {
	return (scaledValue - min) / (max - min);
	// 	}
	// 	case KnobScale.LogE: {
	// 		const logMin = Math.log(min);
	// 		const logMax = Math.log(max);
	// 		const numerator = Math.log(scaledValue) - logMin;
	// 		const denominator = logMax - logMin;
	// 		return numerator / denominator + LINEAR_MIN;
	// 	}
	// }
};

const scaleValue = (normalizedValue: number, min: number, max: number) => {
	// switch (scale) {
	// 	case KnobScale.Linear: {
	return min + (max - min) * normalizedValue;
	// 	}
	// 	case KnobScale.LogE: {
	// 		const logMin = Math.log(min);
	// 		const logMax = Math.log(max);
	// 		return Math.exp(
	// 			(normalizedValue - LINEAR_MIN) * (logMax - logMin) - logMin
	// 		);
	// 	}
	// }
};

export const Knob: React.FunctionComponent<KnobProps> = (props: KnobProps) => {
	const [id] = React.useState(uniqueId());

	const [normalizedValue, setNormalizedValue] = React.useState(1);
	const [dragging, setDragging] = React.useState(false);
	const pointerState = React.useRef();

	React.useEffect(() => {
		setNormalizedValue(normalizeValue(props.value, props.min, props.max));
	}, [props.value, props.min, props.max]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const normalizedValue = parseFloat(e.target.value);
		const scaledValue = toFixedNumber(
			scaleValue(normalizedValue, props.min, props.max),
			3
		);
		props.setValue(scaledValue);
		props.dispatchValue(scaledValue);
	};

	return (
		<div className={knob.wrapper}>
			<label htmlFor={id} data-ratio={Math.round(360 * normalizedValue)}>
				<span>{props.label}</span>
			</label>
			<input
				id={id}
				type="range"
				onChange={handleChange}
				min={LINEAR_MIN}
				max={LINEAR_MAX}
				step={0.0001}
				value={normalizedValue}
				aria-valuemin={props.min}
				aria-valuemax={props.max}
				aria-valuenow={props.value}
				aria-valuetext={`${props.value}`}
			/>
		</div>
	);
};
