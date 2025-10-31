'use strict';
import {
	AudioContext,
	IAnalyserNode,
	IAudioDestinationNode,
	IAudioNode,
} from 'standardized-audio-context';

import { initCvs, primer as defaultPrimer, drawRawOsc } from './canvas-tools';
import { queueAnimation } from '../../../../shared/utils';

type CanvasHookFunction = (
	context: CanvasRenderingContext2D,
	width: number,
	height: number,
) => void;

export class Oscilloscope {
	private paused = false;
	private analyser: IAnalyserNode<AudioContext>;
	private width = 300;
	private height = 150;

	private init: CanvasHookFunction;
	private primer: CanvasHookFunction;

	private u8ar: Uint8Array;

	private cctx: CanvasRenderingContext2D;
	constructor(
		private actx: AudioContext,
		private src: IAudioNode<AudioContext>,
		private cvs: HTMLCanvasElement,
		private dest?: IAudioDestinationNode<AudioContext>,
		private FFT: number = 2048,
		init?: CanvasHookFunction,
		primer?: CanvasHookFunction,
	) {
		this.init = init ?? initCvs;
		this.primer = primer ?? defaultPrimer;
		this.analyser = this.actx.createAnalyser();

		// Configure Analyzer
		this.analyser.fftSize = this.FFT;
		this.src.connect(this.analyser);
		if (this.dest) this.analyser.connect(this.dest);

		// Set up Canvas
		let { width = 300, height = 150 } = this.cvs;
		this.width = width;
		this.height = height;
		this.u8ar = new Uint8Array(this.FFT);
		const cctx = this.cvs.getContext('2d');
		if (!cctx) {
			throw new Error('failed to initialize Oscilloscope <canvas> element');
		}
		this.cctx = cctx;
		this.init(this.cctx, this.width, this.height);
	}

	draw = () => {
		if (!this.paused) queueAnimation(this.draw);
		this.cctx.clearRect(0, 0, this.width, this.height);
		this.primer(this.cctx, this.width, this.height);
		this.analyser.getByteTimeDomainData(this.u8ar);
		drawRawOsc(this.cctx, this.u8ar, this.width, this.height);
	};

	start = () => {
		this.paused = false;
		this.draw();
	};

	pause = () => {
		this.paused = true;
	};

	reset = () => {
		this.paused = true;
		queueAnimation(() => {
			this.u8ar = new Uint8Array(this.FFT).fill(0);
			this.cctx.clearRect(0, 0, this.width, this.height);
			this.primer(this.cctx, this.width, this.height);
			drawRawOsc(this.cctx, this.u8ar, this.width, this.height);
		});
	};

	get isPaused() {
		return this.paused;
	}
}
