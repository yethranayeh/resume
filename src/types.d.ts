declare global {
	namespace JSX {
		interface IntrinsicElements {
			page: import("react").PropsWithChildren<{ size: "A4" }>;
		}
	}
}
