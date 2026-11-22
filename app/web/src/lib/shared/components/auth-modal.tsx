import { useCallback, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { usePathname, useSearch } from 'wouter/use-browser-location';

import { AuthContext } from '../../../api/auth/context';
import { AuthForm } from './auth-form';

export type AuthModalMode = 'login' | 'register';

const param = 'auth';

/**
 * Sign-in over whatever page is already mounted, so the work on that page survives.
 * Opened by the query param `?auth=login|register`; closing strips the param and writes
 * the clean URL with `replace: true`, so the back button lands where the user expects.
 *
 * The editor routes are the reason this exists — see docs/features/auth-modals.md. The
 * standalone /login and /register pages still render their own form, so this stays out of
 * the way when one of them is mounted: only one form host is live at a time.
 */
export const AuthModal: React.FC<{ onAuthenticated?: () => void }> = ({
	onAuthenticated,
}) => {
	const pathname = usePathname();
	// wouter only re-renders on a pathname change, so the query is subscribed separately:
	// without this the dialog never opens or closes on a client-side nav
	const search = useSearch();
	const [, navigate] = useLocation();
	const { user } = useContext(AuthContext);

	const value = new URLSearchParams(search).get(param);

	// allow-list: an unknown or absent value means no dialog. the standalone pages render
	// their own form, so the host stands down while one of them is mounted
	const mode: AuthModalMode | null =
		pathname === '/login' || pathname === '/register'
			? null
			: value === 'login' || value === 'register'
				? value
				: null;

	const open = mode !== null && !user;
	const closeButton = useRef<HTMLButtonElement | null>(null);
	const trigger = useRef<Element | null>(null);

	const close = useCallback(() => {
		const params = new URLSearchParams(window.location.search);
		params.delete(param);
		navigate(`${pathname}${params.toString() ? `?${params}` : ''}`, {
			replace: true,
		});
		const back = trigger.current;
		trigger.current = null;
		if (back instanceof HTMLElement && back.isConnected) back.focus();
	}, [navigate, pathname]);

	// focus lands in the dialog and comes back if it walks out, so tabbing never escapes into
	// the patch behind the scrim. No focus trap library: one ref, one keydown handler.
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

	// the page behind is position:fixed and full viewport; lock it so the dialog cannot be
	// scrolled out of the way on a short window
	useEffect(() => {
		if (!open) return;
		document.body.classList.add('auth-modal-open');
		return () => document.body.classList.remove('auth-modal-open');
	}, [open]);

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
					mode={mode}
					onAuthenticated={() => {
						// the caller (the editor) finishes the save the user was trying to make;
						// without that callback this just closes, and the patch is still there
						onAuthenticated?.();
						close();
					}}
				/>
			</section>
		</div>
	);
};
