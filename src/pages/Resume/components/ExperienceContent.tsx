import { ResumeExperience } from "../../../components/Experience";
import { ResumeSection } from "../../../components/Section";
import { getResumeContent } from "../utils";

export function ExperienceContent({ lang }: { lang: LangOption }) {
	const resume = getResumeContent(lang);

	return (
		<ResumeSection title={resume.experience.title}>
			{resume.experience.list.map((experience) => (
				<ResumeExperience
					key={experience.company}
					{...experience}
					// FIXME: terrible way to implement this. switch to i18next
					period={{ ...experience.period, end: experience.period.end ?? resume.experience.present }}
				/>
			))}
		</ResumeSection>
	);
}
