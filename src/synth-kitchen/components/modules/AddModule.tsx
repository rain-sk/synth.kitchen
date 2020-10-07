import * as React from 'react';
import webmidi from '../../io/webmidi';

export interface IAddModuleProps {
    handleNewModuleTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleAddModuleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface IAddModuleState {
    active: boolean;
}

export class AddModule extends React.Component<IAddModuleProps, IAddModuleState> {
    constructor(props: IAddModuleProps) {
        super(props);
        this.state = {
            active: false
        };
    }

    handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            active: false
        });
        this.props.handleAddModuleClick(e);
    }

    render() {
        return (
            <fieldset className="add-module">
                <legend className="visually-hidden">Add Module</legend>
                <select onChange={this.props.handleNewModuleTypeChange} tabIndex={0}>
                    <option value={'GAIN'}>gain</option>
                    <option value={'DELAY'}>delay</option>
                    <option value={'FILTER'}>filter</option>
                    <option value={'OSCILLATOR'}>oscillator</option>
                    <option value={'SEQUENCER'}>sequencer</option>
                    {webmidi.inputs.length > 0 ?
                        (
                            <>
                                <option value={'MIDI_DEVICE'}>midi device</option>
                                <option value={'MIDI_OSCILLATOR'}>midi oscillator</option>
                            </>
                        ) : null}
                </select>
                <button onClick={this.handleAddClick} tabIndex={0}>Add Module</button>
                {this.state.active ? null : <i className="add-module"></i>}
            </fieldset>
        );
    }
}