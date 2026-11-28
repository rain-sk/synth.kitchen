import { useCallback, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Link } from 'wouter';
import { usePathname, useSearch } from 'wouter/use-browser-location';

import { AuthContext } from '../../../api/auth/context';
import { clearAuthParams, keepAfterAuth } from '../auth-after';
import { t } from '../../../lang';
import { AuthForm } from './auth-form';

export type AuthModalMode = 'login';

const param = 'auth';

export const AuthModal = () => {
	const pathname = usePathname();
	const search = useSearch();
	const [, navigate] = useLocation();
	const { user } = useContext(AuthContext);

	const value = new URLSearchParams(search).get(param);

	const mode: AuthModalMode | null =
		pathname === '/login'
			? null
			: value === 'login'
				? value
				: null;

	const open = mode !== null && !user;
	const closeButton = useRef<HTMLButtonElement | null>(null);
	const trigger = useRef<Element | null>(null);

	const leave = useCallback(
		(to: string | null) => {
			navigate(to ?? pathname, { replace: true });
			const back = trigger.current;
			trigger.current = null;
			if (back instanceof HTMLElement && back.isConnected) back.focus();
		},
		[navigate, pathname],
	);

	const close = useCallback(() => leave(clearAuthParams(pathname)), [
		leave,
		pathname,
	]);

	useEffect(() => {
		if (!open) return;
		trigger.current = document.activeElement;
		const field = document.querySelector<HTMLElement>('#auth-dialog input');
		(field ?? closeButton.current)?.focus();

		const keepFocusInside = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				close();
				return;
			}
			if (e.key !== 'Tab') return;
			const dialog = document.getElementById('auth-dialog');
			if (!dialog || dialog.contains(document.activeElement)) return;
			const focusables = dialog.querySelectorAll<HTMLElement>(
				'button, input, a[href], [tabindex]:not([tabindex="-1"])',
			);
			(focusables[0] ?? closeButton.current)?.focus();
		};

		document.addEventListener('keydown', keepFocusInside);
		return () => document.removeEventListener('keydown', keepFocusInside);
	}, [open, close]);

	useEffect(() => {
		if (!open) return;
		document.body.classList.add('auth-modal-open');
		return () => document.body.classList.remove('auth-modal-open');
	}, [open]);

	const finish = useCallback(
		() => leave(keepAfterAuth(pathname)),
		[leave, pathname],
	);

	if (!open || !mode) return null;

	return (
		<div
			id="auth-scrim"
			role="presentation"
			onMouseDown={(e) => {
				if (e.target === e.currentTarget) close();
			}}
		>
			<section
				id="auth-dialog"
				role="dialog"
				aria-modal="true"
				aria-labelledby="auth-title"
				tabIndex={-1}
			>
				<header>
					<h2 id="auth-title">{mode}</h2>
					<button
						id="auth-close"
						type="button"
						aria-label="close"
						ref={closeButton}
						onClick={close}
					>
						×
					</button>
				</header>
				<AuthForm
					onAuthenticated={finish}
				/>
				<p className="auth-switch">
					<Link id="auth-switch" to="/login" replace>
						{t('auth.signInPageLink')}
					</Link>
				</p>
			</section>
		</div>
	);
};
