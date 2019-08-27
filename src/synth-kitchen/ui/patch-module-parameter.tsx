import * as React from 'react';
import { Knob, Arc, Pointer } from 'rc-knob-accessible';
import { ConnectorType } from './patch-module';
import { Connector } from './patch-connector';

export interface IParameterProps {
	moduleKey: string;
	id: string;
	name: string;
	value: number;
	scale: (normalizedValue: number) => number;
	onChange: (newValue: number) => void;
	display: (currentValue: number) => number;
	type?: ConnectorType;
}

export const Parameter: React.FunctionComponent<IParameterProps> = props => {
	const [inputValue, setInputValue] = React.useState(props.value);
	const [editing, setEditing] = React.useState(false);

	React.useEffect(() => {
		setInputValue(props.value);
	}, [props.value]);

	const onInputFocus = () => {
		setEditing(true);
	}

	const onInputBlur = () => {
		setEditing(false);
		props.onChange(inputValue);
	};

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (editing && event.target.value) {
			setInputValue(parseFloat(event.target.value));
		}
	};

	const onEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (editing && event.which === 13) {
			props.onChange(inputValue);
		}
	}

	const onKnobChange = (knobValue: number) => {
		props.onChange(props.scale(knobValue));
	}

	return (
		<fieldset className="parameter">
			<legend>{props.name}</legend>
			<span className="control">
				{props.type === 'CV_IN' ? (
					<Connector type={props.type} name={props.name} moduleKey={props.moduleKey} connectorId={props.id} />
				) : null}
				<Knob
					size={100}
					angleOffset={180}
					angleRange={360}
					min={0}
					max={1}
					className="styledKnob"
					htmlFor={`input_${props.id}`}
					onChange={onKnobChange}
				>
					<Arc
						arcWidth={1.5}
					/>
					<circle r="40" cx="50" cy="50" />
					<Pointer
						width={2}
						height={35}
						radius={10}
						type="rect"
						color="#fff"
					/>
				</Knob>
			</span>
			<input id={`input_${props.id}`} type="number" value={props.display(inputValue)} onChange={onInputChange} onFocus={onInputFocus} onBlur={onInputBlur} onKeyDown={onEnterKeyDown} />
		</fieldset>
	);
};