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

	const Bubble = ({ toast }: { toast: Toast }) => (
		<div className={`toast ${toast.kind}`} data-toast-key={toast.key}>
			<span className="toast-message">{toast.message}</span>
			{toast.action ? (
				<button
					type="button"
					className="toast-action"
					onClick={() => {
						toast.action?.run();
						dismiss(toast.key);
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

	const quiet = toasts.filter((toast) => toast.kind !== 'error');
	const loud = toasts.filter((toast) => toast.kind === 'error');

	return (
		<ToastsContext.Provider value={{ notify, dismiss }}>
			{children}
			<div className="toasts">
				<div className="toasts-stack" role="status" aria-live="polite">
					{quiet.map((toast) => (
						<Bubble key={toast.key} toast={toast} />
					))}
				</div>
				<div className="toasts-stack" role="alert" aria-live="assertive">
					{loud.map((toast) => (
						<Bubble key={toast.key} toast={toast} />
					))}
				</div>
			</div>
		</ToastsContext.Provider>
	);
};
