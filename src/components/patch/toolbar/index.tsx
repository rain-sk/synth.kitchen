import React from 'react';

import { Record } from '../editor/record';
import { SaveToCloud } from './save-to-cloud';
import { PatchNameField } from './patch-name-field';
import { LoadFromCloud } from './load-from-cloud';
import { SaveToDisk } from './save-to-disk';
import { LoadFromDisk } from './load-from-disk';

export const Toolbar: React.FC<{}> = () => {
	return (
		<>
			<nav>
				<section>
					<Record />
					<SaveToDisk />
					<LoadFromDisk />
				</section>
				<section>
					<PatchNameField />
					<SaveToCloud />
					<LoadFromCloud />
				</section>
			</nav>
		</>
	);
};
