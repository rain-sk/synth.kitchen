import * as React from 'react';

const { v4 } = require('uuid');

export interface ISettingProps {
	id?: string;
	name: string;
	value: string;
	options: [string, string][];
	onChange: (newValue: string) => void;
}

export interface ISettingState {
	id: string;
}

export class SettingRadio extends React.Component<ISettingProps, ISettingState> {
	constructor(props: ISettingProps) {
		super(props);
		this.state = {
			id: props.id ? props.id : v4() as string
		};
	}

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onChange(e.target.value);
	};

	componentDidUpdate = (oldProps: ISettingProps) => {
		if (oldProps.id !== this.props.id && this.props.id) {
			this.setState({
				id: this.props.id
			});
		}
	}

	render() {
		return (
			<fieldset className="setting" >
				<legend>{this.props.name}</legend>
				{this.props.options.map((option, index) => (
					<span className="option" key={index}>
						<input type="radio" name={this.state.id} id={`${this.state.id}_${option[0]}`} value={option[0]} checked={option[0] === this.props.value} onChange={this.handleChange} />
						<label htmlFor={`${this.state.id}_${option[0]}`}>{option[1]}</label>
					</span>
				))}
			</fieldset >
		);
	}
}

export const SettingSelect: React.FunctionComponent<ISettingProps> = props => {
	const [id] = React.useState(v4() as string);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		props.onChange(e.target.value);
	};

	return (
		<fieldset className="setting">
			<legend>{props.name}</legend>
			<select value={props.value} onChange={handleChange}>
				{props.options.map((option, index) => (
					<option key={index} value={option[0]}>{option[1]}</option>
				))}
			</select>
		</fieldset>
	);
};