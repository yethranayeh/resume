import { useTranslation } from "react-i18next";

import { Experience } from "../../../components/Experience/Experience";
import { ResumeSection } from "../../../components/Section";
import { Project } from "../../../components/Experience/Project";

type CutoffPoint = {
	companyIndex?: number;
	projectIndex?: number;
};
interface Props {
	hideTitle?: boolean;
	cutoffPoint?: CutoffPoint;
}

const companies = [
	{
		name: "ets" as const,
		skills: [
			"React",
			"TypeScript (ES6+)",
			"MUI",
			"Redux Toolkit",
			"Vite",
			"Storybook",
			"react-email",
			"Node.js",
			// "Java",
			"CI/CD (Jenkins)"
		],
		projects: [1, 2, 3, 4]
	},
	{
		name: "1pixel" as const,
		skills: ["HTML", "CSS", "Liquid", "Shopify Templates"],
		projects: [1]
	}
];

export function ExperienceContent({ hideTitle, cutoffPoint }: Props) {
	const { t } = useTranslation("resume", { keyPrefix: "experience" });

	return (
		<ResumeSection hideTitle={hideTitle} title={t("title")}>
			{companies.slice(cutoffPoint?.companyIndex).map(({ name, skills, projects }) => (
				<Experience key={name} company={name} skills={skills}>
					<ul style={{ paddingLeft: "1cm", display: "flex", flexDirection: "column", gap: "2mm" }}>
						{projects.slice(cutoffPoint?.projectIndex).map((project) => (
							<Project
								key={project}
								// @ts-expect-error
								title={t(`companies.${name}.role.${project}.project`)}
								// @ts-expect-error
								description={t(`companies.${name}.role.${project}.description`)}
							/>
						))}
					</ul>
				</Experience>
			))}
		</ResumeSection>
	);
}
