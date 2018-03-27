import React, { Component } from 'react';

export default class IoConnection extends Component {
  componentDidMount() {
    let canvas = document.querySelector("canvas#" + this.props.id);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(this.props.connection.curve.sourceX, this.props.connection.curve.sourceY);
    ctx.bezierCurveTo(this.props.connection.curve.cp1x, this.props.connection.curve.cp1y, this.props.connection.curve.cp2x, this.props.connection.curve.cp2y, this.props.connection.curve.destX, this.props.connection.curve.destY);
    ctx.strokeStyle = "#CB5DFF";
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.font = "14px monospace";
    ctx.fillText(this.props.connection.source.guid, this.props.connection.curve.sourceX + 20, this.props.connection.curve.sourceY);
    ctx.fillText(this.props.connection.destination.guid, this.props.connection.curve.destX - 45, this.props.connection.curve.destY);
  }
  mean(num1, num2) {
    return (num1 + num2) / 2.0;
  }
  render() {
    return (
      <canvas id={this.props.id} />
    );
  }
}