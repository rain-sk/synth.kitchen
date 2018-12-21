import Modulator from './Modulator';

export default class ModulatorStack {
  get frequency() {
    return this.osc.frequency.value;
  }
  set frequency(value) {
    this.osc.frequency.value = value;
  }
  constructor(types, freqs, gains, context) {
    this.context = context;
    this.osc = context.createOscillator();
    if (types.length === freqs.length && freqs.length === gains.length) {

      var modulatorSettings = [];
      for (var i = 0; i < types.length; i++) {
        modulatorSettings.push({
          type: types[i],
          freq: freqs[i],
          gain: gains[i],
          context: context
        });
      }

      var modulators = [];
      modulatorSettings.forEach((setting) => {
        modulators.push(new Modulator(setting));
      })

      var modOutput = modulators.reduce(function (input, output) {
        input.gain.connect(output.modulator.frequency);
        return output;
      });

      modOutput.gain.connect(this.osc.frequency);
    }
    this.osc.connect(context.destination);
    this.osc.start();
  }
  start() {
    this.osc.connect(this.context.destination);
  }
  stop() {
    this.osc.disconnect();
  }
}