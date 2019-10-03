import * as React from 'react';
import { IConnection, ConnectionType, IEnd } from '../state/patch';
import { ConnectorCable } from './patch-connection-cable';
import { ConnectorCircle } from './patch-connection-circle';


/** Connection */
export interface IConnectionProps {
	context: CanvasRenderingContext2D;
	sourceX: number;
	sourceY: number;
	destinationX: number;
	destinationY: number;
	cp1x: number;
	cp1y: number;
	cp2x: number;
	cp2y: number;
	type: ConnectionType;
}

export const Connection: React.FunctionComponent<IConnectionProps> = (props) => {
	return (
		<>
			<ConnectorCable {...props} />
			<ConnectorCircle {...props} x={props.sourceX} y={props.sourceY} />
			<ConnectorCircle {...props} x={props.destinationX} y={props.destinationY} />
		</>
	);
}


/** Connections */
export interface ICurve {
	sourceX: number;
	sourceY: number;
	destinationX: number;
	destinationY: number;
	cp1x: number;
	cp1y: number;
	cp2x: number;
	cp2y: number;
	type: ConnectionType;
}

export interface IConnectionsProps {
	active?: IEnd;
	moduleCount: number;
	rackCount: number
	connections: IConnection[];
}

export interface IConnectionsState {
	curves: ICurve[];
	context2d?: CanvasRenderingContext2D;
}

export class Connections extends React.Component<IConnectionsProps, IConnectionsState> {
	spanRef = React.createRef<HTMLSpanElement>();
	canvasRef = React.createRef<HTMLCanvasElement>();

	constructor(props: IConnectionsProps) {
		super(props);
		this.state = {
			curves: []
		}

		this.updateCanvasSize = this.updateCanvasSize.bind(this);
		this.updateCurves = this.updateCurves.bind(this);

		window.addEventListener('resize', this.updateCurves, false);
	}

	componentDidMount() {
		this.initContext2d();
	}

	// shouldComponentUpdate(nextProps: IConnectionsProps, nextState: IConnectionsState) {
	// 	return (nextProps.moduleCount !== this.props.moduleCount) ||
	// 		(nextProps.rackCount !== this.props.rackCount) ||
	// 		(nextProps.connections.length !== this.props.connections.length) ||
	// 		(nextState.curves.length !== this.state.curves.length) ||
	// 		(nextState.context2d !== this.state.context2d);
	// }

	componentDidUpdate(prevProps: IConnectionsProps) {
		if ((prevProps.moduleCount !== this.props.moduleCount) ||
			(prevProps.rackCount !== this.props.rackCount) ||
			(prevProps.connections.length !== this.props.connections.length)) {
			this.updateCurves();
		}
	}

	updateCanvasSize() {
		const width = this.spanRef.current ? this.spanRef.current.offsetWidth : 0;
		const height = this.spanRef.current ? this.spanRef.current.offsetHeight : 0;
		if (this.canvasRef.current && this.state.context2d) {
			this.state.context2d.clearRect(0, 0, width, height);
			this.state.context2d.clearRect(0, 0, width, height);
			this.canvasRef.current.width = width;
			this.canvasRef.current.height = height;
		}
	}

	updateCurves() {
		this.updateCanvasSize();
		this.setState({
			curves: getConnectionCurves(this.props.connections)
		});
	}

	initContext2d() {
		const init = setInterval(() => {
			if (this.canvasRef.current) {
				const context2d = this.canvasRef.current.getContext('2d');
				if (context2d) {
					this.setState({
						context2d
					}, () => {
						clearInterval(init);
						this.updateCurves();
					});
				}
			}
		}, 5);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateCurves, false);
	}

	render() {
		console.log(this.props.connections);
		return (
			<span ref={this.spanRef} className="connections">
				<canvas ref={this.canvasRef} />
				{this.state.curves.map((curve, index) =>
					this.state.context2d ?
						<Connection
							context={this.state.context2d}
							key={index}
							{...curve} />
						: null
				)}
			</span>
		);
	}
}

function getConnectionCurves(connections: IConnection[]) {
	const curves: ICurve[] = [];
	connections.forEach(connection => {
		const source = document.getElementById(connection.source.connectorId) as HTMLButtonElement;
		const destination = document.getElementById(connection.destination.connectorId) as HTMLButtonElement;
		if (source && destination) {
			const sourceBoundingClientRect = source.getBoundingClientRect();
			const destinationBoundingClientRect = destination.getBoundingClientRect();
			const sourceX = sourceBoundingClientRect.left + sourceBoundingClientRect.width / 2 + window.pageXOffset;
			const sourceY = sourceBoundingClientRect.top + sourceBoundingClientRect.height / 2 + window.pageYOffset;
			const destinationX = destinationBoundingClientRect.left + destinationBoundingClientRect.width / 2 + window.pageXOffset;
			const destinationY = destinationBoundingClientRect.top + destinationBoundingClientRect.height / 2 + window.pageYOffset;

			curves.push({
				sourceX,
				sourceY,
				destinationX,
				destinationY,
				cp1x: (destinationX + sourceX) / 2 - ((destinationX - sourceX) * 0.1),
				cp1y: (destinationY + sourceY) / 2 + ((destinationY - sourceY) * 0.2) + Math.abs(sourceX - destinationX) * .2,
				cp2x: (destinationX + sourceX) / 2 + ((destinationX - sourceX) * 0.1),
				cp2y: ((destinationY + sourceY) / 2 + ((destinationY - sourceY) * 0.2)) + Math.abs(sourceX - destinationX) * .2,
				type: connection.type
			});
		}
	});
	return curves;
}
