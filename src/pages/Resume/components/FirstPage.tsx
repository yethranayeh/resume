import { ResumeHeader } from "../../../components/Header";
import { ExperienceContent } from "./ExperienceContent";

export function FirstPage() {
	return (
		<page size='A4'>
			<main>
				<ResumeHeader />
				<ExperienceContent toCompany={2} />
			</main>
		</page>
	);
}
