import React from 'react';

import { LoadFromDisk } from './load-from-disk';
import { RecipeNameField } from './recipe-name-field';
import { Record } from './record';
import { SaveToCloud } from './save-to-cloud';
import { SaveToDisk } from './save-to-disk';
import { Link } from 'wouter';

import icon from './icon.png';

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
					<Link href="/">
						<img src={icon} alt="synth kitchen icon" width={30} height={30} />
					</Link>
					<RecipeNameField />
					<SaveToCloud />
				</section>
			</nav>
		</>
	);
};
