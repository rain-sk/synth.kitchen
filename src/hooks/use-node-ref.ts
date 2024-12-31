import { useRef, useState } from 'react';

export const useNodeRef = <NodeType>(nodeFactory: () => NodeType) => {
	const [node] = useState(nodeFactory);
	return useRef(node);
};
