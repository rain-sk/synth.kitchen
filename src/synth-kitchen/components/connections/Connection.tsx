import * as React from 'react';
import { IConnection, ConnectionType, IEnd } from '../../state/patch';
import { ConnectionCable } from './ConnectionCable';
import { ConnectionCircle } from './ConnectionCircle';


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
	singleton?: boolean;
	width?: number;
	height?: number;
}

export const Connection: React.FunctionComponent<IConnectionProps> = (props) => {
	if (props.singleton && props.width && props.height) {
		props.context.clearRect(0, 0, props.width, props.height);
	}
	return (
		<>
			<ConnectionCable {...props} />
			<ConnectionCircle {...props} x={props.sourceX} y={props.sourceY} />
			<ConnectionCircle {...props} x={props.destinationX} y={props.destinationY} />
		</>
	);
}


/** Connections */
export interface ICable {
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
	cables: ICable[];
	mouseCable?: ICable;
	context2d?: CanvasRenderingContext2D;
	mouseContext2d?: CanvasRenderingContext2D;
}

export class Connections extends React.Component<IConnectionsProps, IConnectionsState> {
	spanRef = React.createRef<HTMLSpanElement>();
	canvasRef = React.createRef<HTMLCanvasElement>();
	mouseRef = React.createRef<HTMLCanvasElement>();

	constructor(props: IConnectionsProps) {
		super(props);
		this.state = {
			cables: []
		}

		window.addEventListener('resize', this.updateCables, false);
		document.addEventListener('mousemove', this.handleMouseMove, false);
	}

	componentDidMount = () => {
		this.initContexts();
	}

	componentDidUpdate = (prevProps: IConnectionsProps, prevState: IConnectionsState) => {
		if ((prevProps.moduleCount !== this.props.moduleCount) ||
			(prevProps.rackCount !== this.props.rackCount) ||
			(prevProps.connections.length !== this.props.connections.length)) {
			this.updateCables();
		}
		if ((prevProps.moduleCount !== this.props.moduleCount) ||
			(prevState.mouseCable && !this.state.mouseCable) ||
			(prevProps.active && !this.props.active)) {
			this.clearMouseCanvas();
		}
	}

	updateCanvasSize = () => {
		const { width, height } = this.getWidthAndHeight();
		if (this.canvasRef.current && this.state.context2d && this.mouseRef.current && this.state.mouseContext2d) {
			this.state.context2d.clearRect(0, 0, width, height);
			this.state.mouseContext2d.clearRect(0, 0, width, height);
			this.canvasRef.current.width = width;
			this.canvasRef.current.height = height;
			this.mouseRef.current.width = width;
			this.mouseRef.current.height = height;
		}
	}

	clearMouseCanvas = () => {
		const { width, height } = this.getWidthAndHeight();
		this.state.mouseContext2d && this.state.mouseContext2d.clearRect(0, 0, width, height);
	}

	handleMouseMove = (event: MouseEvent) => {
		if (this.props.active) {
			const width = this.spanRef.current ? this.spanRef.current.offsetWidth : 0;
			const height = this.spanRef.current ? this.spanRef.current.offsetHeight : 0;
			const { mouseContext2d } = this.state;
			if (mouseContext2d && this.mouseRef.current) {
				this.mouseRef.current.width = width;
				this.mouseRef.current.height = height;
				this.setState({
					mouseCable: getMouseCable(event, this.props.active.connectorId)
				});
			} else {
				this.setState({
					mouseCable: undefined
				}, () => {
					this.clearMouseCanvas();
				});
			}
		} else if (this.state.mouseCable) {
			this.setState({
				mouseCable: undefined
			}, () => {
				this.clearMouseCanvas();
			});
		}
	}

	updateCables = () => {
		this.updateCanvasSize();
		this.setState({
			cables: getConnectionCables(this.props.connections)
		});
	}

	initContexts = () => {
		const initConnections = setInterval(() => {
			if (this.canvasRef.current) {
				const context2d = this.canvasRef.current.getContext('2d');
				if (context2d) {
					this.setState({
						context2d
					}, () => {
						clearInterval(initConnections);
						this.updateCables();
					});
				}
			}
		}, 5);
		const initMouse = setInterval(() => {
			if (this.mouseRef.current) {
				const mouseContext2d = this.mouseRef.current.getContext('2d');
				if (mouseContext2d) {
					this.setState({
						mouseContext2d
					}, () => {
						clearInterval(initMouse);
					});
				}
			}
		}, 5);
	}

	getWidthAndHeight = () => {
		if (this.spanRef.current) {
			const rect = this.spanRef.current.getBoundingClientRect();
			return {
				width: rect.width,
				height: rect.height
			};
		}
		throw new Error("no spanref, this shouldn't happen");
	}

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.updateCables, false);
		document.removeEventListener('mousemove', this.handleMouseMove, false);
	}

	render() {
		return (
			<span ref={this.spanRef} className="connections">
				<canvas ref={this.canvasRef} />
				<canvas ref={this.mouseRef} />
				{this.state.cables.map((cable, index) =>
					this.state.context2d ?
						<Connection
							context={this.state.context2d}
							key={index}
							{...cable}
						/> : null
				)}

				{(({ mouseContext2d, mouseCable }) => {
					return mouseContext2d && mouseCable ?
						<Connection
							context={mouseContext2d}
							key={'mouse'}
							{...mouseCable}
							singleton={true}

						/> : null;
				})(this.state)}

			</span>
		);
	}
}

function getMouseCable(event: MouseEvent, activeId: string): ICable | undefined {
	const active = document.getElementById(activeId);
	if (active) {
		const activeBoundingClientRect = active.getBoundingClientRect();
		const sourceX = activeBoundingClientRect.left + activeBoundingClientRect.width / 2 + window.pageXOffset;
		const sourceY = activeBoundingClientRect.top + activeBoundingClientRect.height / 2 + window.pageYOffset;
		const destinationX = event.pageX;
		const destinationY = event.pageY;
		return {
			sourceX,
			sourceY,
			destinationX,
			destinationY,
			cp1x: sourceX + (destinationX - sourceX) / 2,
			cp1y: sourceY + (destinationY - sourceY) / 2 - (destinationY - sourceY) / 3,
			cp2x: destinationX + (sourceX - destinationX) / 2,
			cp2y: destinationY + (sourceY - destinationY) / 2 - (sourceY - destinationY) / 3,
			type: 'MOUSE'
		};
	}
}

function getConnectionCables(connections: IConnection[]) {
	const cables: ICable[] = [];
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

			cables.push({
				sourceX,
				sourceY,
				destinationX,
				destinationY,
				cp1x: sourceX + (destinationX - sourceX) / 2,
				cp1y: sourceY + (destinationY - sourceY) / 2 - (destinationY - sourceY) / 5,
				cp2x: destinationX + (sourceX - destinationX) / 2,
				cp2y: destinationY + (sourceY - destinationY) / 2 - (sourceY - destinationY) / 5,
				type: connection.type
			});
		}
	});
	return cables;
}
