import React, { Component } from 'react';
import { Matrix, IoConnection, Drag } from '.';

export default class IoMatrix extends Component {
  get awaitingMouseUp() {
    return this.state.newSource != null && this.state.newDestination == null;
  }
  get awaitingMouseDown() {
    return this.state.newSource == null;
  }
  constructor(props) {
    super(props);
    this.state = {
      matrix: new Matrix(),
      newSource: null,
      drag: null,
      newDestination: null
    }
    props.register(this);
    // this.onDrag = this.onDrag.bind(this);
    // this.destinationMouseUp = this.destinationMouseUp.bind(this);
    // document.addEventListener("drag", this.onDrag);
    // document.addEventListener("mouseup", this.destinationMouseUp);
    setInterval(() => {
      console.log(this.state.matrix);
    }, 2000);
  }
  tryConnect(source, destination) {
    let matrixCopy = this.state.matrix;
    try {
      matrixCopy.connect(source, destination);
      this.setState({
        matrix: matrixCopy
      });
    } catch (e) {
      console.error(e);
    }
  }
  sourceMouseDown(target, x, y, guid) {
    if (this.awaitingMouseDown) {
      let newSource = {
        target: target,
        guid: guid,
        x: x,
        y: y
      };
      this.setState({
        newSource: newSource
      });
    } else {
      this.clearConnectionBuffer();
    }
  }
  destinationMouseUp(target, x, y, guid) {
    if (this.awaitingMouseUp) {
      let newSource = this.state.newSource;
      let newDestination = {
        target: target,
        guid: guid,
        x: x,
        y: y
      };
      this.setState({
        newDestination: newDestination
      });
      this.tryConnect(newSource, newDestination);
    }
    this.clearConnectionBuffer();
  }
  // onDrag(e) {
  //   this.setState({
  //     drag: new Drag(
  //       this.state.newSource,
  //       {
  //         x: e.clientX,
  //         y: e.clientY
  //       }
  //     )
  //   });
  // }
  // onMouseup(e) {
  //   setTimeout(() => {
  //     if (!this.awaitingMouseUp) {
  //       this.clearConnectionBuffer();
  //     }
  //   }, 10);
  // }
  sourceDisconnect(guid) {
    this.clearConnectionBuffer();
    let matrixCopy = this.state.matrix;
    while (matrixCopy.nodeMap.has(guid)) {
      matrixCopy.delete(guid);
    }
    this.setState({
      matrix: matrixCopy
    });
  }
  destinationDisconnect(guid) {
    this.clearConnectionBuffer();
    let matrixCopy = this.state.matrix;
    matrixCopy.delete(guid);
    this.setState({
      matrix: matrixCopy
    });
  }
  clearConnectionBuffer() {
    this.setState({
      newSource: null,
      newDestination: null,
      drag: null
    });
  }
  render() {
    let connections = [];
    this.state.matrix.subMap.forEach((value, key) => {
      connections.push(<IoConnection key={'io-' + key} id={'io-' + key} curve={value.curve} />);
    });
    return (
      <div className="io-matrix">
        {connections}
      </div>
    );
  }
}
