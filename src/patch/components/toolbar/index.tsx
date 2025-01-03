import React from 'react';

import { LoadFromCloud } from './load-from-cloud';
import { LoadFromDisk } from './load-from-disk';
import { PatchNameField } from './patch-name-field';
import { Record } from './record';
import { SaveToCloud } from './save-to-cloud';
import { SaveToDisk } from './save-to-disk';

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
