import type { PropsWithChildren } from "preact/compat";
import { useTranslation } from "react-i18next";
import { Company } from "../../i18n/types";
import styles from "./Experience.module.scss";

export const Experience = ({
	children,
	company,
	skills
}: PropsWithChildren<{ company: Company; skills: Array<string> }>) => {
	const { t } = useTranslation("resume", { keyPrefix: `experience.companies.${company}` });
	const { t: t2 } = useTranslation("resume", { keyPrefix: "experience" });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.headerCol}>
					<h3 className={styles.company}>{t("company")}</h3>
					<h3 className='text-bold'>{t("title")}</h3>
				</div>
				<div className={styles.headerCol} style={{ alignItems: "flex-end" }}>
					<span>{t("location")}</span>
					<div className={styles.periodContainer}>
						<span className='text-caption'>{t("period.start")}</span>
						{" - "}
						<span className='text-caption'>{t("period.end", { defaultValue: "" }) || "Present"}</span>
					</div>
				</div>
			</div>

			<div className={styles.info}>
				<p>{t("description")}</p>
				<p>
					<span className='text-medium'>{t2("skills")}:</span> {skills.join(", ")}
				</p>
			</div>

			{children}
		</div>
	);
};
