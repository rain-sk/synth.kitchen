import * as React from 'react';

const { v4 } = require('uuid');

export interface ISettingProps {
	name: string;
	value: string;
	options: [string, string][];
	onChange: (newValue: string) => void;
}

export const Setting: React.FunctionComponent<ISettingProps> = props => {
	const [id] = React.useState(v4() as string);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange(e.target.value);
	};

	return (
		<fieldset className="setting">
			<legend>{props.name}</legend>
			{props.options.map((option, index) => (
				<span className="option" key={index}>
					<input type="radio" name={id} id={`${id}_${option[0]}`} value={option[0]} checked={option[0] === props.value} onChange={handleChange} />
					<label htmlFor={`${id}_${option[0]}`}>{option[1]}</label>
				</span>
			))}
		</fieldset>
	);
};