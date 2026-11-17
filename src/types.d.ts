/**
 * Build-time contact data. Aliased in `vite.config.ts` to either
 * `src/data/contact.public.json` (default) or `src/data/contact.private.json`
 * (`--mode private`). Declared here rather than inferred from either JSON file,
 * so the two can differ in shape without breaking the type.
 */
declare module "@contact" {
	interface ContactReference {
		name: string;
		title: string;
		company?: string;
		phone?: string;
		email?: string;
	}

	interface Contact {
		/** Empty string means "omit from the rendered header". */
		email?: string;
		phone?: string;
		links: Array<string>;
		references: Array<ContactReference>;
	}

	const contact: Contact;
	export default contact;
}

type PathInto<T extends Record<string, any>> = keyof {
	[K in keyof T as T[K] extends string
		? K
		: T[K] extends Record<string, any>
		? `${K & string}.${PathInto<T[K]> & string}`
		: never]: any;
};
