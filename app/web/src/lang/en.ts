export const en = {
	toast: {
		dismiss: 'dismiss',
		retry: 'try again',
		saving: 'saving…',
		saved: 'saved',
		saveFailed: 'could not save',
		loaded: 'loaded {name} — {modules} modules, {cables} cables',
		loadFailed: 'could not load {name}',
		recordSaved: 'recorded {duration}',
		recordBlocked: 'microphone unavailable',
		midiConnected: 'midi connected',
		midiDenied: 'midi unavailable',
		midiUnplugged: 'midi device unplugged',
		upgraded: 'patch upgraded to this version',
	},
	patch: {
		untitled: 'untitled',
		savedAt: 'saved {time}',
		neverSaved: 'not saved yet',
	},
	crash: {
		title: 'the editor hit an error',
		intro: 'your patch is still here, nothing has been deleted',
		tryAgain: 'try again',
		copyPatch: 'copy patch json',
		downloadPatch: 'download patch json',
		reloaded: 'unsaved changes will be lost',
		detail: 'error details',
		copied: 'copied',
		canvasTitle: 'the canvas hit an error',
	},
};

export type Catalog = typeof en;

export default en;
