import React from 'react';

import { t } from '../../../lang';

type Crash = {
	message: string;
	componentStack?: string;
	at: number;
	patch?: unknown;
};

type Props = {
	region: string;
	children: React.ReactNode;
	getState?: () => unknown;
};

type State = {
	crash: Crash | null;
};

declare global {
	interface Window {
		__synthCrash?: Crash;
		__synthCrashOn?: boolean;
	}
}

export const armCrash = () => {
	window.__synthCrashOn = true;
};

export const ThrowOnPurpose: React.FC = () => {
	if (window.__synthCrashOn !== false) {
		throw Error('deliberate crash');
	}

	return <div id="crash-recovered">recovered</div>;
};

export class ErrorBoundary extends React.Component<Props, State> {
	state: State = { crash: null };

	static getDerivedStateFromError(error: unknown): State {
		return {
			crash: {
				message: String(
					(error as Error)?.message ?? error ?? 'unknown error',
				),
				at: Date.now(),
			},
		};
	}

	componentDidCatch(error: unknown, info: React.ErrorInfo) {
		const crash: Crash = {
			...this.state.crash,
			message: String((error as Error)?.message ?? error ?? 'unknown error'),
			componentStack: info.componentStack ?? undefined,
			at: Date.now(),
			patch: this.props.getState?.(),
		};

		(crash as any).region = this.props.region;
		(window as any).__synthCrash = crash;

		console.error(`[${this.props.region}]`, error, info.componentStack);
	}

	reset = () => this.setState({ crash: null });

	copy = (text: string) => {
		navigator.clipboard?.writeText(text);
	};

	patchJson = () => {
		try {
			return JSON.stringify(this.state.crash?.patch ?? null, null, 2);
		} catch {
			return '{}';
		}
	};

	download = () => {
		const blob = new Blob([this.patchJson()], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `synth-kitchen-patch-${Date.now()}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};

	render() {
		const { crash } = this.state;

		if (!crash) {
			return this.props.children;
		}

		return (
			<section
				id={`crash-${this.props.region}`}
				className="crash"
				role="alert"
				aria-live="assertive"
			>
				<h2>
					{this.props.region === 'canvas'
						? t('crash.canvasTitle')
						: t('crash.title')}
				</h2>
				<p>{t('crash.intro')}</p>

				<div className="crash-actions">
					<button type="button" id="crash-try-again" onClick={this.reset}>
						{t('crash.tryAgain')}
					</button>
					{this.props.getState && (
						<button
							type="button"
							id="crash-copy-patch"
							onClick={() => this.copy(this.patchJson())}
						>
							{t('crash.copyPatch')}
						</button>
					)}
					{this.props.getState && (
						<button type="button" id="crash-download-patch" onClick={this.download}>
							{t('crash.downloadPatch')}
						</button>
					)}
					<button
						type="button"
						id="crash-reload"
						onClick={() => window.location.reload()}
					>
						{t('crash.reloaded')}
					</button>
				</div>

				<details id="crash-details">
					<summary>{t('crash.detail')}</summary>
					<pre>{crash.message}</pre>
					<pre>{crash.componentStack}</pre>
				</details>
			</section>
		);
	}
}

export default ErrorBoundary;
