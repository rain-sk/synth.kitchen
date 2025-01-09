import { useMemo } from 'react';
import { IPatchAction } from '../../state/actions';
import { IPatchState } from '../../state/types/patch';
import { ModuleProps } from '../module';
import { ConnectionsProps } from './connections';
import { ModuleCanvasBackdropProps } from './module-canvas-backdrop';

export const useEditorComponentProps = (
	state: IPatchState,
	dispatch: React.Dispatch<IPatchAction>,
) => {
	const moduleCanvasBackdropProps: ModuleCanvasBackdropProps = useMemo(
		() => ({
			dispatch,
			modulePositions: state.modulePositions,
			modules: state.modules,
			selectedModuleKeys: state.selectedModuleKeys,
		}),
		[dispatch, state.modulePositions, state.modules, state.selectedModuleKeys],
	);

	const connectionsProps: ConnectionsProps = useMemo(
		() => ({
			activeConnectorKey: state.activeConnectorKey,
			modules: state.modules,
			modulePositions: state.modulePositions,
			connections: state.connections,
			connectors: state.connectors,
		}),
		[
			state.activeConnectorKey,
			state.modules,
			state.modulePositions,
			state.connections,
			state.connectors,
		],
	);

	const moduleProps: ModuleProps = useMemo(
		() => ({
			selectedModuleKeys: state.selectedModuleKeys,
			selectionPending: state.selectionPending,
			heldModifiers: state.heldModifiers,
			dispatch,
		}),
		[
			state.selectedModuleKeys,
			state.selectionPending,
			state.heldModifiers,
			dispatch,
		],
	);

	return { moduleCanvasBackdropProps, connectionsProps, moduleProps };
};
