export default class Modulator {
  constructor(setting) {
    this.modulator = setting.context.createOscillator();
    this.gain = setting.context.createGain();
    this.modulator.type = setting.type;
    this.modulator.frequency.value = setting.freq;
    this.gain.gain.value = setting.gain;
    this.modulator.connect(this.gain);
    this.modulator.start(0);
  }
}