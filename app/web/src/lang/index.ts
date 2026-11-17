import en, { Catalog } from './en';

// dot paths over the catalog, so a typo is a compile error rather than a blank toast.
// swapping in an i18next instance should only change this module, never a call site.
type DotKeys<T, Prefix extends string = ''> = T extends object
	? {
			[K in keyof T & string]: DotKeys<
				T[K],
				Prefix extends '' ? K : `${Prefix}.${K}`
			>;
	  }[keyof T & string]
	: Prefix;

export type MessageKey = DotKeys<Catalog>;

const catalogs: Record<string, Catalog> = { en };

export const setLanguage = (lang: string) => catalogs[lang] ?? en;

export const t = (key: MessageKey, vars?: Record<string, string | number>) => {
	const value = key
		.split('.')
		.reduce<any>(
			(acc, part) => (acc == null ? undefined : acc[part]),
			setLanguage('en'),
		);

	if (typeof value !== 'string') {
		return key;
	}

	return vars
		? value.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`))
		: value;
};

export { en };
export type { Catalog };
