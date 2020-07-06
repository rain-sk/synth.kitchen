import * as React from 'react';

export interface IAddModuleProps {
    handleNewModuleTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleAddModuleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    webmidi: any;

}

interface IAddModuleState {
    active: boolean;
}

export class AddModule extends React.Component<IAddModuleProps, IAddModuleState> {
    fieldsetRef = React.createRef<HTMLFieldSetElement>();

    constructor(props: IAddModuleProps) {
        super(props);
        this.state = {
            active: false
        };
    }

    handleBlur = (e: any) => {
        if (this.fieldsetRef.current) {
            if (e.target.parentElement !== this.fieldsetRef.current) {
                this.setState({
                    active: false
                });
            }
        }
    }

    handleFocus = () => {
        this.setState({
            active: true
        });
    }

    handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            active: false
        });
        this.props.handleAddModuleClick(e);
    }

    render() {
        return (
            <fieldset ref={this.fieldsetRef} onFocus={this.handleFocus} onBlur={this.handleBlur} onMouseLeave={this.handleBlur} onMouseEnter={this.handleFocus} className="add-module">
                <legend className="visually-hidden">Add Module</legend>
                <select className={this.state.active ? "" : "visually-hidden"} onChange={this.props.handleNewModuleTypeChange} tabIndex={0}>
                    <option value={'GAIN'}>gain</option>
                    <option value={'DELAY'}>delay</option>
                    <option value={'FILTER'}>filter</option>
                    <option value={'OSCILLATOR'}>oscillator</option>
                    <option value={'SEQUENCER'}>sequencer</option>
                    {this.props.webmidi.inputs.length > 0 ?
                        (
                            <>
                                <option value={'MIDI_DEVICE'}>midi device</option>
                                <option value={'MIDI_OSCILLATOR'}>midi oscillator</option>
                            </>
                        ) : null}
                </select>
                <button className={this.state.active ? "" : "visually-hidden"} onClick={this.handleAddClick} tabIndex={0}>Add Module</button>
                {this.state.active ? null : <i className="add-module"></i>}
            </fieldset>
        );
    }
}