import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as WebMidi from 'webmidi';
import { noteToFrequency, transpose, /*noteToMidi, , getNote,*/ } from 'music-fns';

import { AppComponent } from './ts/components/app';

import './main.css';
import { audioContext } from './ts/utils/audio-context';

import { Launchpad } from './launchpad';


export const nextBeatTime = (tempo: number, currentTime: number, zeroTime: number = 0): number => {
    return Math.ceil((currentTime - zeroTime) / (60 / tempo)) * (60 / tempo) + zeroTime;
}

export const nextBarTime = (tempo: number, currentTime: number, zeroTime: number = 0): number => {
    return nextBeatTime(tempo, currentTime, zeroTime) * 4;
};

const base = 'C1';

const cache = new Map<number, { freq: number, name: string }>();
export function chromatic(note: number): { freq: number, name: string } {
    const cachedResult = cache.get(note);
    if (cachedResult === undefined) {
        const row = parseInt(note.toString()[0]) - 1;
        const col = (note % 10) - 1;
        const name = transpose(base, 5 * row + col);
        const freq = noteToFrequency(name);
        const result = {
            name,
            freq
        };
        cache.set(note, result);
        return result;
    } else {
        return cachedResult;
    }
}

function init() {
    if (!!AudioContext) {
        WebMidi.enable(function (err) {
            if (!!err) {
                console.error(err);
                return;
            }
            else {
                const lfo1 = (() => {
                    const osc = audioContext.createOscillator();
                    osc.frequency.value = 0.02;
                    const gain = audioContext.createGain();
                    gain.gain.value = 2;
                    osc.start();
                    osc.connect(gain);
                    return {
                        get frequency() {
                            return osc.frequency;
                        },
                        connect: (target: any) => {
                            gain.connect(target);
                        },
                        disconnect: (target: any) => {
                            gain.disconnect(target);
                        }
                    }
                })();
                const lfo2 = (() => {
                    const osc = audioContext.createOscillator();
                    osc.frequency.value = 0.5;
                    const gain = audioContext.createGain();
                    gain.gain.value = 4;
                    osc.start();
                    osc.connect(gain);
                    return {
                        connect: (target: any) => {
                            gain.connect(target);
                        },
                        disconnect: (target: any) => {
                            gain.disconnect(target);
                        }
                    }
                })();
                lfo2.connect(lfo1.frequency);
                const on = new Map<number, [OscillatorNode, OscillatorNode]>();
                const pad = new Launchpad(() => { }, (e) => {
                    const { freq } = chromatic(e.note.number);
                    const osc1 = audioContext.createOscillator();
                    //const nextBeat = nextBeatTime(120, audioContext.currentTime);
                    osc1.frequency.value = freq;
                    osc1.detune.value = 2;
                    lfo1.connect(osc1.detune);
                    osc1.type = 'triangle';
                    osc1.connect(audioContext.destination);
                    osc1.start();//nextBeat);
                    const osc2 = audioContext.createOscillator();
                    osc2.frequency.value = freq;
                    osc2.detune.value = -9;
                    lfo2.connect(osc2.detune);
                    osc2.type = 'sawtooth';
                    osc2.connect(audioContext.destination);
                    osc2.start();//nextBeat);
                    on.set(e.note.number, [osc1, osc2]);
                    pad.playNote(e.note.number, Math.floor(128 * Math.random()));
                }, (e) => {
                    const note = e.data[1];
                    const oscillators = on.get(note);
                    if (oscillators !== undefined) {
                        const [osc1, osc2] = oscillators;
                        //const nextBeat = nextBarTime(120, nextBarTime(120, audioContext.currentTime) + .01);
                        if (!!osc1 && !!osc2) {
                            osc1.stop();//nextBeat);
                            osc2.stop();//nextBeat);
                            lfo1.disconnect(osc1.detune);
                            osc1.disconnect(audioContext.destination);
                            lfo2.disconnect(osc2.detune);
                            osc2.disconnect(audioContext.destination);
                            on.delete(note);
                        }
                        pad.stopNote(note);
                    }
                });
            }
        });

        ReactDOM.render(
            <AppComponent />,
            document.getElementById('root') as HTMLElement
        );
        document.removeEventListener('click', init)
    }
}

document.addEventListener('click', init);
