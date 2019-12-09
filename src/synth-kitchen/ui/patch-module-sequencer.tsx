import * as React from 'react';
import { IModuleProps } from './patch-module-old';
import { modules } from '../state/module-map';
import { audioContext } from '../io/utils/audio-context';
import { Parameter } from './patch-module-parameter';
import { Connector } from './patch-connector';
import { uniqueId } from '../io/utils/unique-id';

export interface ISequencerState {
    slider1Value: number;
    slider1Duration: number;
    slider2Value: number;
    slider2Duration: number;
    slider3Value: number;
    slider3Duration: number;
    slider4Value: number;
    slider4Duration: number;
    slider5Value: number;
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
                slider1Duration: 1,
                slider2Value: 2.0,
                slider2Duration: 1,
                slider3Value: 4.0,
                slider3Duration: 1,
                slider4Value: 5.0,
                slider4Duration: 1,
                slider5Value: 7.0,
                slider5Duration: 1,
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
            buffer.loop = true;
            buffer.connect(output);
            this.updateSequence();
            buffer.start();
        }
    }

    handleSliderChange = (sliderNumber: number) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(e.target.value);
            if (value !== NaN) {
                const { state } = this;
                (state as any)[`slider${sliderNumber}Value`] = value;
                this.setState(state, () => {
                    this.updateSequence();
                });
            }
        }
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
            module.node.buffer.buffer = (() => {
                const buffer = new AudioBuffer({
                    length: audioContext.sampleRate * this.totalDuration(),
                    sampleRate: audioContext.sampleRate
                });
                buffer.copyToChannel(this.fillBufferArray(buffer.length), 0);
                return buffer;
            })();
        }
    }

    render() {
        return this.state ? (
            <>
                <h2 className="visually-hidden">sequencer</h2>
                <input id={`input_${this.state.slider1Id}`} type="number" value={this.state.slider1Value} onChange={this.handleSliderChange(1)} onBlur={this.handleSliderChange(1)} />
                <Connector
                    type="SIGNAL_OUT"
                    name="output"
                    moduleKey={this.props.moduleKey}
                    connectorId={this.state.outputId} />
            </>
        ) : null;
    }
}
