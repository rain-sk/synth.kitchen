import * as React from 'react';
import { Knob, Arc, Pointer } from 'rc-knob-accessible';
import { ConnectorType } from '../BaseModuleOld';
import { Connector } from './Connector';

export interface IParameterProps {
	moduleKey: string;
	id: string;
	name: string;
	min?: number;
	max?: number;
	value?: number;
	scale?: (normalizedValue: number) => number;
	onChange?: (newValue: number) => void;
	display?: (currentValue: number) => number;
	type?: ConnectorType;
}

export interface IParameterState {
	inputValue?: number;
	editing: boolean;
}

export class Parameter extends React.Component<IParameterProps, IParameterState> {
	constructor(props: IParameterProps) {
		super(props);

		this.state = {
			inputValue: props.value,
			editing: false
		};
	}

	componentDidUpdate(oldProps: IParameterProps) {
		if (oldProps.value !== this.props.value) {
			this.setState({
				inputValue: this.props.value
			});
		}
	}

	onInputBlur = () => {
		if (this.state.editing) {
			this.setState({
				editing: false
			});
			if (this.props.onChange && (this.state.inputValue || this.state.inputValue === 0)) {
				this.props.onChange(this.state.inputValue);
			}
		}
	};

	onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!this.state.editing) {
			this.setState({
				editing: true
			});
		}
		this.setState({
			inputValue: parseFloat(event.target.value)
		});

	};

	onEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (this.state.editing && event.which === 13) {
			this.setState({
				editing: false
			});
			if (this.props.onChange && (this.state.inputValue || this.state.inputValue === 0)) {
				this.props.onChange(this.state.inputValue);
			}
		}
	}

	onKnobChange = (knobValue: number) => {
		if (this.props.onChange && this.props.scale) {
			this.props.onChange(this.props.scale(knobValue));
		}
	}

	render() {

		return (
			<fieldset className="parameter" >
				<legend>{this.props.name}</legend>
				<span className="control">
					{this.props.type === 'CV_IN' ? (
						<Connector type={this.props.type} name={this.props.name} moduleKey={this.props.moduleKey} connectorId={this.props.id} />
					) : null}
					{this.state.inputValue !== undefined ? (
						<Knob
							size={50}
							angleOffset={180}
							angleRange={360}
							min={this.props.min !== undefined ? this.props.min : 0}
							max={this.props.max !== undefined ? this.props.max : 1}
							className="styledKnob"
							htmlFor={`input_${this.props.id}`}
							onChange={this.onKnobChange}
						>
							<Arc
								arcWidth={1.5}
							/>
							<circle r="20" cx="25" cy="25" />
							<Pointer
								width={2}
								height={35}
								radius={10}
								type="rect"
								color="#fff"
							/>
						</Knob>
					) : null}
				</span>
				{this.props.display && this.state.inputValue !== undefined ? (
					<input id={`input_${this.props.id}`} type="number" value={this.props.display(this.state.inputValue)} onChange={this.onInputChange} onBlur={this.onInputBlur} onKeyDown={this.onEnterKeyDown} />
				) : null}
			</fieldset>
		);
	}
}