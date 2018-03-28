import ModulatorStack from '../utilities/ModulatorStack';

export default class Operator {
  get frequency() {
    return this.carrier.frequency;
  }
  set frequency(value) {
    this.carrier.frequency = value;
  }
  start() {
    this.carrier.start();
  }
  constructor(context) {
    this.context = context;
    this.carrier = new ModulatorStack(
      ["sine", "sawtooth", "sine"],
      [0.1, 1, 39],
      [100, 100, 100],
      this.context
    );
  }
}