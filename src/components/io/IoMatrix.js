import React, { Component } from 'react';
import { IoConnection } from '.';

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
      connections: [],
      newSource: null,
      newDestination: null
    }
    props.register(this);
  }
  connect(source, destination) {
    if (this.noExistingConnection(source, destination)) {
      try {
        source.target.connect(destination.target);
        let connections = this.state.connections;
        connections.push({
          source: {
            target: source.target,
            name: source.name
          },
          destination: {
            target: destination.target,
            name: destination.name
          },
          curve: {
            sourceX: source.x,
            sourceY: source.y,
            destX: destination.x,
            destY: destination.y,
            cp1x: this.mean(destination.x, source.x) - ((destination.x - source.x) * 0.1),
            cp1y: this.mean(destination.y, source.y) + ((destination.y - source.y) * 0.2) + Math.abs(source.x - destination.x) * .2,
            cp2x: this.mean(destination.x, source.x) + ((destination.x - source.x) * 0.1),
            cp2y: (this.mean(destination.y, source.y) + ((destination.y - source.y) * 0.2)) + Math.abs(source.x - destination.x) * .2
          }
        });
        this.setState({
          connections: connections
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
  sourceMouseDown(source, x, y, targetName) {
    console.log(source);
    console.log(targetName);
    if (this.awaitingMouseDown) {
      let newSource = {
        target: source,
        x: x,
        y: y,
        name: targetName
      };
      this.setState({
        newSource: newSource
      });
    } else {
      this.clearConnectionBuffer();
    }
  }
  destinationMouseUp(destination, x, y, targetName) {
    if (this.awaitingMouseUp) {
      let newSource = this.state.newSource;
      let newDestination = {
        target: destination,
        name: targetName,
        x: x,
        y: y
      };
      this.setState({
        newDestination: newDestination
      });
      this.connect(newSource, newDestination);
    }
    this.clearConnectionBuffer();
  }
  sourceDisconnect(target, targetName) {
    let indices = [];
    for (let i = 0; i < this.state.connections.length; i++) {
      if (this.state.connections[i].source.name === targetName) {
        indices.push(i);
      }
    }
    this.disconnect(indices);
  }
  destinationDisconnect(target, targetName) {
    let indices = [];
    for (let i = 0; i < this.state.connections.length; i++) {
      if (this.state.connections[i].destination.name === targetName) {
        indices.push(i);
      }
    }
    this.disconnect(indices);
  }
  disconnect(indices) {
    this.clearConnectionBuffer();
    let connections = this.state.connections;
    indices.forEach(index => {
      try {
        connections[index].source.target.disconnect(connections[index].destination.target);
      } catch (e) {
        console.error(e);
      }
    });
    for (let i = indices.length - 1; i >= 0; i--) {
      connections.splice(indices[i], 1);
    }
    this.setState({
      connections: connections
    });
  }
  noExistingConnection(source, destination) {
    for (let i = 0; i < this.state.connections.length; i++) {
      if (this.state.connections[i].source.name === source.name && this.state.connections[i].destination.name === destination.name) {
        return false;
      }
    }
    return true;
  }
  clearConnectionBuffer() {
    this.setState({
      newSource: null,
      newDestination: null
    });
  }
  mean(num1, num2) {
    return (num1 + num2) / 2.0;
  }
  render() {
    let connections = []
    this.state.connections.forEach((connection, index) => {
      connections.push(
        <IoConnection key={'io-' + index} id={'io-' + index} connection={connection} />
      );
    })
    return (
      <div className="io-matrix">
        {connections}
      </div>
    );
  }
}