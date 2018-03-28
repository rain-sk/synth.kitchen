import React, { Component } from 'react';

export default class IoConnection extends Component {
  componentDidMount() {
    let canvas = document.querySelector("canvas#" + this.props.id);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(this.props.curve.sourceX, this.props.curve.sourceY);
    ctx.bezierCurveTo(this.props.curve.cp1x, this.props.curve.cp1y, this.props.curve.cp2x, this.props.curve.cp2y, this.props.curve.destX, this.props.curve.destY);
    ctx.strokeStyle = "#CB5DFF";
    ctx.lineWidth = 5;
    ctx.stroke();

    // debug stuff
    // ctx.font = "14px monospace";
    // ctx.fillText(this.props.connection.source.guid, this.props.curve.sourceX + 20, this.props.curve.sourceY);
    // ctx.fillText(this.props.connection.destination.guid, this.props.curve.destX - 45, this.props.curve.destY);
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