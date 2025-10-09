const DEFAULT_FILL = '#111111';
const DEFAULT_STROKE = '#11ff11';
const HLINE_COLOR = '#555555';

export function initCvs(ctx: CanvasRenderingContext2D, _: number, __: number) {
	ctx.fillStyle = DEFAULT_FILL;
	ctx.strokeStyle = DEFAULT_STROKE;
}

export function primer(
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
) {
	ctx.fillRect(0, 0, width, height);
	ctx.strokeStyle = HLINE_COLOR;
	ctx.beginPath();
	ctx.moveTo(0, height / 2);
	ctx.lineTo(width, height / 2);
	ctx.stroke();
	ctx.strokeStyle = DEFAULT_STROKE;
}

export function drawRawOsc(
	ctx: CanvasRenderingContext2D,
	data: Uint8Array,
	width: number,
	height: number,
) {
	ctx.beginPath();
	for (let i = 0; i < data.length; i++) {
		let x = i * ((width * 1.0) / data.length); // need to fix x
		let v = data[i] / 128.0;
		let y = (v * height) / 2;
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.stroke();
}
