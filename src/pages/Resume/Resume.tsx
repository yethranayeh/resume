import { FirstPage } from "./components/FirstPage";
import { SecondPage } from "./components/SecondPage";

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
			{/* <SecondPage /> */}
		</>
	);
};
