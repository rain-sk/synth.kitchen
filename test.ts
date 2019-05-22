export interface Connection {
	source: string;
	target: string;
}

export interface Network {
	connections?: Connection[];
}

export function removeConnection(network: Network, source: string, target: string) {
	if (network.connections) {
		const connection = network.connections.find(con => con.source === source && con.target === target);
		if (connection) {
			network.connections = network.connections.filter(con => con.source !== source || con.target !== target)
		}
	}
}