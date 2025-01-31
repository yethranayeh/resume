import { Education } from "../../../components/Education";
import { Reference } from "../../../components/Reference";
import { ResumeSection } from "../../../components/Section";
import { getResumeContent } from "../utils";

export function SecondPage({ lang }: { lang: LangOption }) {
	const resume = getResumeContent(lang);
	return (
		<page size='A4'>
			<div className='lower-grid '>
				<div className='education'>
					<ResumeSection title={resume.education.title}>
						{resume.education.list.map((education) => (
							<Education key={education.institution} {...education} />
						))}
					</ResumeSection>
				</div>

				<div className='languages'>
					<ResumeSection title={resume.language.title}>
						<div>
							{resume.language.list.map((lang) => (
								<div key={lang.name}>
									{lang.name} - <span className='text-caption'>{lang.fluency}</span>
								</div>
							))}
						</div>
					</ResumeSection>
				</div>

				<div className='references'>
					<ResumeSection title={resume.reference.title}>
						{resume.reference.list.map((ref) => (
							<Reference key={ref.name} {...ref} />
						))}
					</ResumeSection>
				</div>
			</div>
		</page>
	);
}
