import { Link } from 'wouter';
import icon from './icon.png';

export const Nav = () => {
	return (
		<nav>
			<section></section>
			<section>
				<Link href="/">
					<img src={icon} alt="Synth Kitchen" width={30} height={30} />
				</Link>
			</section>
		</nav>
	);
};
