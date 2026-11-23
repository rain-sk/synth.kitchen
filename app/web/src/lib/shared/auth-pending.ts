type Intent = () => void;

// the dialog is mounted above the router and the interrupted action lives deep inside the
// editor, so the handoff is a ref outside React: setting it must not re-render the patch
let pending: Intent | null = null;

export const setPendingIntent = (intent: Intent | null) => {
	pending = intent;
};

export const runPendingIntent = () => {
	const intent = pending;
	pending = null;
	intent?.();
};
