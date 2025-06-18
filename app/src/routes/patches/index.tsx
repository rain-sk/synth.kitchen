// import { useEffect, useState } from 'react';
// import { DatabasePatch /*, useApi*/ } from '../api/use-api';
import { Link } from 'wouter';

const PatchItem: React.FC<{ id: string; name: string }> = ({ id, name }) => (
	<li>
		<Link href={`/patch/${id}`}>{name}</Link>
	</li>
);

export const PatchesRoute = () => {
	// const [patches, setPatches] = useState<DatabasePatch[]>([]);

	// const { getPatches } = useApi();
	// const getPatches = () =>
	// 	new Promise(() => {
	// 		data: {
	// 			rows: [];
	// 		}
	// 	});

	// useEffect(() => {
	// 	getPatches()
	// 		// .then((res) => (res ? res.json() : { rows: [] }))
	// 		// .then((data: { rows: DatabasePatch[] }) => setPatches(data.rows));
	// }, [setPatches, getPatches]);

	return (
		<>
			<main>
				<h1>Synth Kitchen</h1>
				<section>
					<h2>Patches</h2>
					<ul>
						<PatchItem id="" name="Blank Patch" />
						{/* {patches.map((patch) => (
							<PatchItem key={patch.ID} name={patch.Name} id={patch.ID} />
						))} */}
					</ul>
				</section>
			</main>
		</>
	);
};
