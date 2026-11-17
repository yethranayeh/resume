import { useTranslation } from "react-i18next";

import contact from "@contact";

import styles from "./Header.module.scss";

export function ResumeHeader() {
	const { t } = useTranslation("resume", { keyPrefix: "header" });

	// Contact details come from the build-time @contact alias, not from source.
	// Empty values are dropped, so the public and private builds can differ in
	// item count without the layout caring. See src/data/README.md.
	const info = [t("location"), contact.email, contact.phone, ...contact.links].filter(Boolean);

	return (
		<header className={styles.header}>
			<h1 className={`${styles.name} text-black`}>{t("name")}</h1>

			<ul className={styles.info}>
				{info.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>

			<article className={styles.summary}>{t("summary")}</article>
		</header>
	);
}
