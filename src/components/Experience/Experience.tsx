import type { PropsWithChildren } from "preact/compat";
import { useTranslation } from "react-i18next";
import { Company } from "../../i18n/types";
import styles from "./Experience.module.scss";

export const Experience = ({
	children,
	company,
	isPromoted
}: PropsWithChildren<{ company: Company; isPromoted?: boolean }>) => {
	const { t } = useTranslation("resume", { keyPrefix: `experience.companies.${company}` });

	return (
		<div className={styles.container}>
			<div className={styles.companyInfoContainer}>
				{!isPromoted && <h3 className={styles.company}>{t("company")}</h3>}
				<div className={styles.periodContainer}>
					<span className='text-caption'>{t("period.start")}</span>
					<span className='text-caption'>{t("period.end", { defaultValue: "" }) || "Present"}</span>
				</div>
			</div>

			<div className={styles.experienceInfoContainer}>
				<div className={styles.experienceSummary}>
					<h3 className={styles.experience}>{t("title")}</h3>
					<p>{t("description")}</p>
				</div>

				{children}
			</div>
		</div>
	);
};
