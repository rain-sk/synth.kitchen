import React, {
 createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

import { t } from '../../../lang';

export type ToastKind = 'pending' | 'success' | 'error' | 'info';

export type Toast = {
	key: string;
	kind: ToastKind;
	message: string;
	action?: { label: string; run: () => void };
};

type ToastsApi = {
	notify: (toast: Toast) => void;
	dismiss: (key: string) => void;
};

const TTL = 15000;

const ToastsContext = createContext<ToastsApi>({
	notify: () => {},
	dismiss: () => {},
});

export const useToasts = () => useContext(ToastsContext);

// hoisted: declared inside the provider body it was a brand new component type on every render, so
// React tore down and rebuilt each bubble whenever state changed (measured: the node does not survive
// the pending→success transition). That restarted the entry animation mid-notification, replaced the
// live-region text with remove+add instead of an update, and dropped focus off `.toast-action` for
// keyboard users on the retry path
const Bubble: React.FC<{ toast: Toast; dismiss: (key: string) => void }> = ({
	toast,
	dismiss,
}) => (
	<div className={`toast ${toast.kind}`} data-toast-key={toast.key}>
		<span className="toast-message">{toast.message}</span>
		{toast.action ? (
			<button
				type="button"
				className="toast-action"
				onClick={() => {
					// no dismiss here: the only action in the app re-notifies this same key, and
					// notify() replaces in place. Dismissing after run() wiped the fresh 'saving' bubble
					// in the same batch, so retry showed nothing until the request settled and blinked the
					// assertive region from an error to empty
					toast.action?.run();
				}}
			>
				{toast.action.label}
			</button>
		) : undefined}
		<button
			type="button"
			className="toast-dismiss"
			aria-label={t('toast.dismiss')}
			onClick={() => dismiss(toast.key)}
		/>
	</div>
);

export const ToastsProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

	const dismiss = useCallback((key: string) => {
		clearTimeout(timers.current[key]);
		delete timers.current[key];
		setToasts((current) => current.filter((toast) => toast.key !== key));
	}, []);

	const notify = useCallback((toast: Toast) => {
		clearTimeout(timers.current[toast.key]);
		timers.current[toast.key] = setTimeout(() => {
			dismiss(toast.key);
		}, TTL);

		setToasts((current) => {
			const rest = current.filter((existing) => existing.key !== toast.key);
			return [...rest, toast];
		});
	}, [dismiss]);

	useEffect(() => {
		const pending = timers.current;
		return () => {
			Object.values(pending).forEach(clearTimeout);
		};
	}, []);

	const quiet = toasts.filter((toast) => toast.kind !== 'error');
	const loud = toasts.filter((toast) => toast.kind === 'error');

	return (
		<ToastsContext.Provider value={{ notify, dismiss }}>
			{children}
			<div className="toasts">
				<div className="toasts-stack" role="status" aria-live="polite">
					{quiet.map((toast) => (
						<Bubble key={toast.key} toast={toast} dismiss={dismiss} />
					))}
				</div>
				<div className="toasts-stack" role="alert" aria-live="assertive">
					{loud.map((toast) => (
						<Bubble key={toast.key} toast={toast} dismiss={dismiss} />
					))}
				</div>
			</div>
		</ToastsContext.Provider>
	);
};
