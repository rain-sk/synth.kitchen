import * as React from 'react';
import { IModuleProps } from './BaseModuleOld';
import { modules } from '../../state/module-map';
import { audioContext } from '../../io/utils/audio-context';
import { Parameter } from './shared/Parameter';
import { Connector } from './shared/Connector';
import { uniqueId } from '../../io/utils/unique-id';

export interface ISequencerSliders {
    slider1Value: number;
    slider2Value: number;
    slider3Value: number;
    slider4Value: number;
    slider5Value: number;
}

export interface ISequencerState extends ISequencerSliders {
    slider1Duration: number;
    slider2Duration: number;
    slider3Duration: number;
    slider4Duration: number;
    slider5Duration: number;
    outputId: string;
    slider1Id: string;
    slider2Id: string;
    slider3Id: string;
    slider4Id: string;
    slider5Id: string;
}

export class Sequencer extends React.Component<IModuleProps, ISequencerState> {
    constructor(props: IModuleProps) {
        super(props);
        const module = modules.get(props.moduleKey);

        if (module && !module.initialized) {
            module.initialized = true;

            this.state = {
                slider1Value: 0.0,
                slider1Duration: 0.2,
                slider2Value: 2.0,
                slider2Duration: 0.2,
                slider3Value: 4.0,
                slider3Duration: 0.2,
                slider4Value: 5.0,
                slider4Duration: 0.2,
                slider5Value: 7.0,
                slider5Duration: 0.2,
                outputId: uniqueId(),
                slider1Id: uniqueId(),
                slider2Id: uniqueId(),
                slider3Id: uniqueId(),
                slider4Id: uniqueId(),
                slider5Id: uniqueId(),
            };

            const buffer = audioContext.createBufferSource();
            const output = audioContext.createGain();
            output.gain.value = 100;
            module.node = {
                buffer,
                output
            }
            module.connectors = [
                {
                    id: this.state.outputId,
                    name: 'output',
                    type: 'SIGNAL_OUT',
                    getter: () => output
                }
            ];
            this.updateSequence();
        }
    }

    handleSliderChange = (slider: keyof ISequencerSliders) => (newValue: number) => {
        this.setState({
            [slider]: newValue
        } as any, () => {
            if (!isNaN(newValue)) {
                console.log(newValue);
                this.updateSequence();
            }
        });
    }

    totalDuration = () => {
        const { slider1Duration, slider2Duration, slider3Duration, slider4Duration, slider5Duration } = this.state;
        return slider1Duration + slider2Duration + slider3Duration + slider4Duration + slider5Duration;
    }

    fillBufferArray = (bufferLength: number) => {
        const data = new Float32Array(bufferLength);
        const {
            slider1Value,
            slider1Duration,
            slider2Value,
            slider2Duration,
            slider3Value,
            slider3Duration,
            slider4Value,
            slider4Duration,
            slider5Value,
            slider5Duration
        } = this.state;
        const sampleRate = audioContext.sampleRate;
        const one = slider1Duration * sampleRate;
        const two = one + slider2Duration * sampleRate;
        const three = two + slider3Duration * sampleRate;
        const four = three + slider4Duration * sampleRate;
        const five = four + slider5Duration * sampleRate;
        for (let i = 0; i < bufferLength; i++) {
            if (i < one) {
                data[i] = slider1Value;
            } else if (i < two) {
                data[i] = slider2Value;
            } else if (i < three) {
                data[i] = slider3Value;
            } else if (i < four) {
                data[i] = slider4Value;
            } else if (i < five) {
                data[i] = slider5Value;
            }
        }
        return data;
    }

    updateSequence = () => {
        const module = modules.get(this.props.moduleKey);
        if (module) {
            module.node.buffer.loop = false;
            module.node.buffer = audioContext.createBufferSource();
            module.node.buffer.loop = true;
            const buffer = new AudioBuffer({
                length: audioContext.sampleRate * this.totalDuration(),
                sampleRate: audioContext.sampleRate
            });
            buffer.copyToChannel(this.fillBufferArray(buffer.length), 0);
            module.node.buffer.buffer = buffer;
            module.node.buffer.connect(module.node.output);
            module.node.buffer.start();
        }
    }

    render() {
        return this.state ? (
            <>
                <h2 className="visually-hidden">sequencer</h2>
                <Parameter
                    name="slider 1"
                    moduleKey={this.props.moduleKey}
                    id={'slider1'}
                    value={this.state.slider1Value}
                    scale={n => n}
                    display={s => s}
                    onChange={this.handleSliderChange('slider1Value')}
                    type={'uninitialized'} />
                <Parameter
                    name="slider 2"
                    moduleKey={this.props.moduleKey}
                    id={'slider2'}
                    value={this.state.slider2Value}
                    scale={n => n}
                    display={s => s}
                    onChange={this.handleSliderChange('slider2Value')}
                    type={'uninitialized'} />
                <Parameter
                    name="slider 3"
                    moduleKey={this.props.moduleKey}
                    id={'slider3'}
                    value={this.state.slider3Value}
                    scale={n => n}
                    display={s => s}
                    onChange={this.handleSliderChange('slider3Value')}
                    type={'uninitialized'} />
                <Parameter
                    name="slider 4"
                    moduleKey={this.props.moduleKey}
                    id={'slider4'}
                    value={this.state.slider4Value}
                    scale={n => n}
                    display={s => s}
                    onChange={this.handleSliderChange('slider4Value')}
                    type={'uninitialized'} />
                <Parameter
                    name="slider 5"
                    moduleKey={this.props.moduleKey}
                    id={'slider5'}
                    value={this.state.slider5Value}
                    scale={n => n}
                    display={s => s}
                    onChange={this.handleSliderChange('slider5Value')}
                    type={'uninitialized'} />
                <Connector
                    type="SIGNAL_OUT"
                    name="output"
                    moduleKey={this.props.moduleKey}
                    connectorId={this.state.outputId} />
            </>
        ) : null;
    }
}
