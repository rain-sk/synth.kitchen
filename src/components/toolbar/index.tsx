import React, { useState } from 'react';

import { Record } from '../record';
import { PatchLoader } from '../patch-loader';
import { SaveToCloud } from './save-to-cloud';
import { PatchNameField } from './patch-name-field';
import { LoadFromCloud } from './load-from-cloud';
import { SaveToDisk } from './save-to-disk';
import { LoadFromDisk } from './load-from-disk';

export const Toolbar: React.FC<{}> = () => {
	const [loadingFromCloud, setLoadingFromCloud] = useState(false);

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
					<LoadFromCloud setLoadingFromCloud={setLoadingFromCloud} />
				</section>
			</nav>

			<PatchLoader
				loadingFromCloud={loadingFromCloud}
				setLoadingFromCloud={setLoadingFromCloud}
			/>
		</>
	);
};
