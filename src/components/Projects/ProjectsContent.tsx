import { useTranslation } from "react-i18next";
import { ResumeSection } from "../Section";
import styles from "./Projects.module.scss";

export function ProjectsContent() {
	const { t } = useTranslation("resume", { keyPrefix: "projects" });

	return (
		<ResumeSection title={t("title")}>
			<div className={styles.project}>
				<p className='text-bold'>{t("zinn.title")}</p>
				<p>{t("zinn.description")}</p>
				<p className={styles.links}>
					<a href='https://zinn.sh'>zinn.sh</a>
					<span> · </span>
					<a href='https://github.com/yethranayeh/zinn'>github.com/yethranayeh/zinn</a>
				</p>
			</div>
		</ResumeSection>
	);
}
