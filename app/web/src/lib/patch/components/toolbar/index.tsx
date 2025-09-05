import React from 'react';

import { PatchNameField } from './patch-name-field';
import { Record } from './record';
import { SaveToCloud } from './save-to-cloud';
import { Link } from 'wouter';

import icon from './icon.png';

export const Toolbar: React.FC<{}> = () => {
	return (
		<>
			<nav>
				<section>
					<Link href="/">
						<img src={icon} alt="synth kitchen icon" width={30} height={30} />
					</Link>
					<PatchNameField />
					<SaveToCloud />
				</section>
				<section>
					<Record />
				</section>
			</nav>
		</>
	);
};
