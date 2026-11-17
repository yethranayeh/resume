import { useTranslation } from "react-i18next";

import { Experience } from "../../../components/Experience/Experience";
import { ResumeSection } from "../../../components/Section";
import { Project } from "../../../components/Experience/Project";

interface Props {
	hideTitle?: boolean;
	/** First company index to render (inclusive). */
	fromCompany?: number;
	/** Last company index to render (exclusive). Defaults to all. */
	toCompany?: number;
}

const companies = [
	{
		name: "schraubenhandel" as const,
		skills: [
			"TypeScript",
			"Next.js / React",
			"Node.js",
			"SQL / MCP",
			"Typesense",
			"Tailwind / Alpine.js",
			"Grafana / Prometheus",
			"LLM integration"
		],
		projects: [1, 2, 3]
	},
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

export function ExperienceContent({ hideTitle, fromCompany = 0, toCompany }: Props) {
	const { t } = useTranslation("resume", { keyPrefix: "experience" });

	return (
		<ResumeSection hideTitle={hideTitle} title={t("title")}>
			{companies.slice(fromCompany, toCompany).map(({ name, skills, projects }) => (
				<Experience key={name} company={name} skills={skills}>
					<ul style={{ paddingLeft: "1cm", display: "flex", flexDirection: "column", gap: "2mm" }}>
						{projects.map((project) => (
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
