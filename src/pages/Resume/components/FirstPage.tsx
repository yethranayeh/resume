import { useTranslation } from "react-i18next";
import { ResumeHeader } from "../../../components/Header";
import { ExperienceContent } from "./ExperienceContent";
import styles from "./FirstPage.module.scss";

export function FirstPage() {
	const { t, i18n } = useTranslation();
	return (
		<page size='A4'>
			<main>
				<ResumeHeader />
				<h2 className={styles.vocation}>{t("header.title")}</h2>

				<article className={styles.summary}>{t("experience.summary")}</article>

				<div
					className={styles.printHack}
					style={{
						"--cutoff": i18n.language === "en" ? "110px" : "80px"
					}}>
					<ExperienceContent />
				</div>
			</main>
		</page>
	);
}
