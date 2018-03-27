export default class IoMatrix {
  get awaitingMouseUp() {
    return this.newSource != null && this.newDestination == null;
  }
  get awaitingMouseDown() {
    return this.newSource == null;
  }
  constructor() {
    this.io = {
      sources: [],
      destinations: []
    }
    // vars for tracking IO links using mouse events
    this.newSource = null;
    this.newDestination = null;
    // canvas for animation
    this.canvas = null;
  }
  connect(source, destination) {
    try {
      source.connect(destination);
      this.io.sources.push(source);
      this.io.destinations.push(destination);
    } catch (e) {
      console.log(e);
    }
  }
  sourceMouseDown(source) {
    console.log(source);
    if (this.awaitingMouseDown) {
      this.newSource = source;
    } else {
      this.clearConnectionBuffer();
    }
  }
  destinationMouseUp(destination) {
    console.log(destination);
    if (this.awaitingMouseUp) {
      this.newDestination = destination;
      this.connect(this.newSource, this.newDestination);
    }
    this.clearConnectionBuffer();
  }
  sourceDisconnect(source) {
    source.disconnect();
    this.io.sources.forEach((src, index) => {
      if (source === src) {
        this.io.sources.splice(index);
        this.io.destinations.splice(index);

      }
    });
  }
  destinationDisconnect(destination) {
    this.io.destinations.forEach((dst, index) => {
      if (destination === dst) {
        this.io.sources[index].disconnect(destination);
        this.io.sources.splice(index);
        this.io.destinations.splice(index);
      }
    });
  }
  clearConnectionBuffer() {
    this.newSource = null;
    this.newDestination = null;
  }
  setCanvas(canvas) {
    this.canvas = canvas;
  }
}