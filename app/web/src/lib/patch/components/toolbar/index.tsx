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
	minimal: boolean;
}> = ({ sortedModules, modulesCount, connectionsCount, minimal }) => {
	return (
		<>
			<div className="toolbar">
				<section>
					{minimal || (
						<>
							<PatchNameField />
							<SaveToCloud />
						</>
					)}
					<Undo />
					<Redo />
				</section>
				<section>
					{minimal || (
						<>
							<Record />
							<Overview
								sortedModules={sortedModules}
								modulesCount={modulesCount}
								connectionsCount={connectionsCount}
							/>
						</>
					)}
				</section>
			</div>
		</>
	);
};
