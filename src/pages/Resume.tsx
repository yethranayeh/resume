import { ResumeHeader } from "../components/Header";
import { ResumeSection } from "../components/Section";
import { ResumeExperience } from "../components/Experience";
import { Education } from "../components/Education";
import { Reference } from "../components/Reference";

import contentTR from "../i18n/tr/content.json";
import contentEN from "../i18n/en/content.json";

export function Resume({ lang }: { lang: "tr" | "en" }) {
	const resume = (lang === "en" ? contentEN : contentTR).resume;

	return (
		<>
			<page size='A4'>
				<main>
					<ResumeHeader />
					<h2 className='vocation'>Frontend Developer</h2>

					<p className='text-medium' style={{ paddingLeft: "2mm" }}>
						Eligible to work in EU countries<span style={{ color: "crimson" }}>*</span> (Bulgarian Citizenship)
					</p>

					<ResumeSection title={resume.experience.title}>
						{resume.experience.list.map((experience) => (
							<ResumeExperience key={experience.company} {...experience} />
						))}
					</ResumeSection>
				</main>
			</page>
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
		</>
	);
}
