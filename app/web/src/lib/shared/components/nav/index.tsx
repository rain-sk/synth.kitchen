import React, { useContext } from 'react';
import { Link } from 'wouter';
import { AuthContext } from '../../../../api/auth/context';

export const Nav: React.FC = () => {
	const { user, loading } = useContext(AuthContext);

	const authenticated = !loading && user !== undefined;

	return (
		<nav>
			<section>
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
					{authenticated && (
						<li>
							<Link to="/dashboard">Dashboard</Link>
						</li>
					)}
					<li>
						<Link to="/patch/random">Random</Link>
					</li>
					<li>
						<a href="/patch/new">Blank</a>
					</li>
				</ul>
			</section>
			<ul className="nav-links">
				{authenticated ? (
					<>
						<li>
							<Link to="/account">Account</Link>
						</li>
						<li>
							<a href="/logout">Logout</a>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/register">Register</Link>
						</li>
					</>
				)}
				<li>
					<Link to="#">About</Link>
				</li>
			</ul>
		</nav>
	);
};
