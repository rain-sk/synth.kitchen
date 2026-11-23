import type React from 'react';
import type { CapWidget } from 'cap-widget';

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
