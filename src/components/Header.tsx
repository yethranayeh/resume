import { useTranslation } from "react-i18next";
import styles from "./Header.module.scss";

export function ResumeHeader() {
	const { t } = useTranslation("resume", { keyPrefix: "header" });

	return (
		<header className={styles.header}>
			<h1 className={`${styles.name} text-black`}>{t("name")}</h1>

			<ul className={styles.info}>
				<li>{t("location")}</li>
				<li>aktasalper99@gmail.com</li>
				<li>+49 157 76506059</li>
				<li>linkedin.com/in/aktasalper</li>
				<li>github.com/yethranayeh</li>
				<li>aktasalper.com</li>
			</ul>

			<article className={styles.summary}>{t("summary")}</article>
		</header>
	);
}
