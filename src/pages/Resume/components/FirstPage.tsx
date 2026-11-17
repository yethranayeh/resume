import { ResumeHeader } from "../../../components/Header";
import { ExperienceContent } from "./ExperienceContent";
import { EducationContent } from "../../../components/Education/EducationContent";

export function FirstPage() {
	return (
		<page size='A4'>
			<main>
				<ResumeHeader />
				<ExperienceContent />
				<EducationContent />
			</main>
		</page>
	);
}
