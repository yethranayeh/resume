import { useTranslation } from "react-i18next";

import { Experience } from "../../../components/Experience/Experience";
import { ResumeSection } from "../../../components/Section";
import { Project } from "../../../components/Experience/Project";
import { Tech } from "../../../components/Tech";

const companies = [
	{
		isPromoted: false,
		name: "ets-2",
		projects: [
			{ role: "1", tech: ["Gemini AI", "tsdx", "npm"] },
			{ role: "2", tech: ["Storybook", "React", "MUI", "yarn", "Jenkins"] }
		]
	},
	{
		isPromoted: true,
		name: "ets",
		projects: [
			{ role: "1", tech: ["Storybook", "React", "MUI", "yarn", "ink", "inquirer", "meow", "Jenkins"] },
			{ role: "2", tech: ["Mandrill", "mjml-react", "react-email", "node.js", "Jenkins"] },
			{ role: "3", tech: ["JavaScript", "FTL", "JSTL", "JSP", "Java"] },
			{ role: "4", tech: ["TypeScript", "React", "RTK", "Vite", "Vitest", "CASL"] },
			{ role: "5", tech: ["TypeScript", "React", "RTK", "Vite", "CASL"] },
			{ role: "6", tech: ["TypeScript", "React", "RTK", "Vite", "Vitest", "CASL"] }
		]
	},
	{ isPromoted: false, name: "1pixel", projects: [{ role: "1", tech: ["HTML", "CSS", "Liquid", "Shopify Templates"] }] }
] as const;

export function ExperienceContent() {
	const { t } = useTranslation(undefined, { keyPrefix: "experience" });

	return (
		<ResumeSection title={t("title")}>
			{companies.map(({ name, projects, isPromoted }) => (
				<Experience key={name} company={name} isPromoted={isPromoted}>
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
