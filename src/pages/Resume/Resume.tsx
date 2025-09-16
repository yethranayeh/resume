import { FirstPage } from "./components/FirstPage";

declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			page: import("react").PropsWithChildren<{ size: "A4" }>;
		}
	}
}

export const Resume = () => {
	return (
		<>
			<FirstPage />
		</>
	);
};
