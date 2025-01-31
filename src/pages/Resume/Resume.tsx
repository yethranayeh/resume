import { ExperienceContent } from "./components/ExperienceContent";
import { FirstPage } from "./components/FirstPage";
import { SecondPage } from "./components/SecondPage";
import "./hacks.scss";

declare global {
	namespace React.JSX {
		interface IntrinsicElements {
			page: import("react").PropsWithChildren<{ size: "A4" }>;
		}
	}
}

export const Resume = ({ lang }: { lang: LangOption }) => (
	<>
		<FirstPage lang={lang} />
		<page size='A4'>
			<div
				className='exp-2'
				style={{
					"--cutoff": lang === "en" ? "-730px" : "-750px"
				}}>
				<ExperienceContent lang={lang} />
			</div>
		</page>
		<SecondPage lang={lang} />
	</>
);
