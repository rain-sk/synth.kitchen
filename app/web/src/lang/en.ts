export const en = {
	toast: {
		dismiss: 'dismiss',
		retry: 'try again',
		saving: 'saving…',
		saved: 'saved',
		saveFailed: 'could not save',
		loaded: 'loaded {name} — {modules} modules, {cables} cables',
		loadFailed: 'could not load {name}',
		loadRejected: 'that file is not a patch',
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
};

export type Catalog = typeof en;

export default en;
