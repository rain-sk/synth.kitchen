import type React from 'react';
import type { CapWidget } from 'cap-widget';

// cap-widget ships the element's instance type but not JSX wiring; this registers the custom
// element so <cap-widget> typechecks, with ref narrowed to CapWidget (token, reset())
declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'cap-widget': React.HTMLAttributes<HTMLElement> & {
				'data-cap-api-endpoint'?: string;
				ref?: React.Ref<CapWidget>;
			};
		}
	}
}
