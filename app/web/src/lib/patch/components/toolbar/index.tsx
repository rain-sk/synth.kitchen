import React from 'react';
import { PatchNameField } from './patch-name-field';
import { Record } from './record';
import { SaveToCloud } from './save-to-cloud';
import { Module, ModulePosition } from 'synth.kitchen-shared';
import { Overview } from '../editor/overview';
import { Undo } from './undo';
import { Redo } from './redo';

export const Toolbar: React.FC<{
	sortedModules: [Module, ModulePosition][];
	modulesCount: number;
	connectionsCount: number;
}> = ({ sortedModules, modulesCount, connectionsCount }) => {
	return (
		<>
			<div id="toolbar">
				<section>
					<PatchNameField />
					<SaveToCloud />
					<Undo />
					<Redo />
				</section>
				<section>
					<Record />
					<Overview
						sortedModules={sortedModules}
						modulesCount={modulesCount}
						connectionsCount={connectionsCount}
					/>
				</section>
			</div>
		</>
	);
};
