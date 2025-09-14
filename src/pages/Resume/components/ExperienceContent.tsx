import { useTranslation } from "react-i18next";

import { Experience } from "../../../components/Experience/Experience";
import { ResumeSection } from "../../../components/Section";
import { Project } from "../../../components/Experience/Project";
import { Tech } from "../../../components/Tech";

const companies = [
	{
		name: "ets",
		projects: [
			{ role: "1", tech: ["Storybook", "React", "MUI", "yarn", "Jenkins", "ink", "inquirer"] },
			{ role: "2", tech: ["Mandrill", "mjml-react", "react-email", "node.js", "Jenkins"] },
			{ role: "3", tech: ["JavaScript", "FTL", "JSTL", "JSP", "Java"] },
			{ role: "4", tech: ["TypeScript", "React", "RTK", "Vite", "Vitest", "CASL"] },
			{ role: "5", tech: ["TypeScript", "React", "RTK", "Vite", "CASL"] }
		]
	},
	{ isPromoted: false, name: "1pixel", projects: [{ role: "1", tech: ["HTML", "CSS", "Liquid", "Shopify Templates"] }] }
] as const;

export function ExperienceContent() {
	const { t } = useTranslation(undefined, { keyPrefix: "experience" });

	return (
		<ResumeSection title={t("title")}>
			{companies.map(({ name, projects }) => (
				<Experience key={name} company={name}>
					{projects.map((project) => (
						<Project
							key={project.role}
							// @ts-expect-error
							title={t(`companies.${name}.role.${project.role}.project`)}
							// @ts-expect-error
							description={t(`companies.${name}.role.${project.role}.description`)}>
							{project.tech.map((t) => (
								<Tech key={t}>{t}</Tech>
							))}
						</Project>
					))}
				</Experience>
			))}
		</ResumeSection>
	);
}
