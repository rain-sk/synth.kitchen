import React from 'react';
import { Link } from 'wouter';

export const Nav: React.FC = () => {
	const navItems = [
		{ id: 'dashboard', label: 'Dashboard', to: '/dashboard', weight: 10 },
		{ id: 'account', label: 'Account', to: '/account', weight: 20 },
		{ id: 'about', label: 'About', to: '/about', weight: 30 },
	];

	return (
		<nav>
			<div className="logo">
				<Link to="/" aria-label="synth kitchen">
					<svg
						width="40"
						height="40"
						viewBox="0 0 40 40"
						xmlns="http://www.w3.org/2000/svg"
					>
						<text
							x="50%"
							y="50%"
							dominantBaseline="middle"
							textAnchor="middle"
							fill="white"
							fontSize="24"
							fontFamily="Arial, sans-serif"
							fontWeight="bold"
						>
							SK
						</text>
					</svg>
				</Link>
			</div>
			<ul className="nav-links">
				{navItems.map((item) => (
					<li key={item.id}>
						<Link to={item.to}>{item.label}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};
