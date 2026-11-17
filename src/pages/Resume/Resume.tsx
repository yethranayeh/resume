import { FirstPage } from "./components/FirstPage";
import { SecondPage } from "./components/SecondPage";
import { Navbar } from "../../components/Navbar";

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
			<Navbar />
			<FirstPage />
			<SecondPage />
		</>
	);
};
