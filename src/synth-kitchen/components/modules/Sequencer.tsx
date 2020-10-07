import * as React from 'react';
import { IModuleProps } from './BaseModuleOld';
import { modules } from '../../state/module-map';
import { audioContext } from '../../io/audio-context';
import { Parameter } from './shared/Parameter';
import { Connector } from './shared/Connector';
import { uniqueId } from '../../io/unique-id';

export interface ISequencerSliders {
    offset1Value: number;
    offset2Value: number;
    offset3Value: number;
    offset4Value: number;
    offset5Value: number;
    beatDurationValue: number;
}

export interface ISequencerState extends ISequencerSliders {
    outputId: string;
    offset1Id: string;
    offset2Id: string;
    offset3Id: string;
    offset4Id: string;
    offset5Id: string;
    beatDurationId: string;
}

export class Sequencer extends React.Component<IModuleProps, ISequencerState> {
    constructor(props: IModuleProps) {
        super(props);
        const module = modules.get(props.moduleKey);

        if (module && !module.initialized) {
            module.initialized = true;

            this.state = {
                offset1Value: 0.0,
                offset2Value: 2.0,
                offset3Value: 4.0,
                offset4Value: 5.0,
                offset5Value: 7.0,
                beatDurationValue: 0.2,
                outputId: uniqueId(),
                offset1Id: uniqueId(),
                offset2Id: uniqueId(),
                offset3Id: uniqueId(),
                offset4Id: uniqueId(),
                offset5Id: uniqueId(),
                beatDurationId: uniqueId()
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

    handleSliderChange = (offset: keyof ISequencerSliders) => (newValue: number) => {
        console.log(newValue);
        this.setState({
            [offset]: newValue
        } as any, () => {
            if (!isNaN(newValue)) {
                console.log(newValue);
                this.updateSequence();
            }
        });
    }

    totalDuration = () => this.state.beatDurationValue * 5;

    fillBufferArray = (bufferLength: number) => {
        const data = new Float32Array(bufferLength);
        const {
            offset1Value,
            offset2Value,
            offset3Value,
            offset4Value,
            offset5Value,
            beatDurationValue
        } = this.state;
        const sampleRate = audioContext.sampleRate;
        const one = beatDurationValue * sampleRate;
        const two = one + beatDurationValue * sampleRate;
        const three = two + beatDurationValue * sampleRate;
        const four = three + beatDurationValue * sampleRate;
        const five = four + beatDurationValue * sampleRate;
        for (let i = 0; i < bufferLength; i++) {
            if (i < one) {
                data[i] = offset1Value;
            } else if (i < two) {
                data[i] = offset2Value;
            } else if (i < three) {
                data[i] = offset3Value;
            } else if (i < four) {
                data[i] = offset4Value;
            } else if (i < five) {
                data[i] = offset5Value;
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
                    name="offset 1"
                    moduleKey={this.props.moduleKey}
                    id={'offset1'}
                    value={this.state.offset1Value}
                    scale={n => n}
                    display={s => s}
                    onChange={this.handleSliderChange('offset1Value')}
                    type={'uninitialized'} />
                <Parameter
                    name="offset 2"
                    moduleKey={this.props.moduleKey}
                    id={'offset2'}
                    value={this.state.offset2Value}
                    scale={n => n}
                    display={s => s}
                    onChange={this.handleSliderChange('offset2Value')}
                    type={'uninitialized'} />
                <Parameter
                    name="offset 3"
                    moduleKey={this.props.moduleKey}
                    id={'offset3'}
                    value={this.state.offset3Value}
                    scale={n => n}
                    display={s => s}
                    onChange={this.handleSliderChange('offset3Value')}
                    type={'uninitialized'} />
                <Parameter
                    name="offset 4"
                    moduleKey={this.props.moduleKey}
                    id={'offset4'}
                    value={this.state.offset4Value}
                    scale={n => n}
                    display={s => s}
                    onChange={this.handleSliderChange('offset4Value')}
                    type={'uninitialized'} />
                <Parameter
                    name="offset 5"
                    moduleKey={this.props.moduleKey}
                    id={'offset5'}
                    value={this.state.offset5Value}
                    scale={n => n}
                    display={s => s}
                    onChange={this.handleSliderChange('offset5Value')}
                    type={'uninitialized'} />
                <Parameter
                    name="beat duration"
                    moduleKey={this.props.moduleKey}
                    id={'beatDuration'}
                    value={this.state.beatDurationValue}
                    scale={n => n}
                    display={s => s}
                    onChange={this.handleSliderChange('beatDurationValue')}
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
