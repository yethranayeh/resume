import { useTranslation } from "react-i18next";
import styles from "./Header.module.scss";

export function ResumeHeader() {
	const { t } = useTranslation("resume", { keyPrefix: "header" });

	return (
		<header className={styles.header}>
			<h1 className={`${styles.name} text-black`}>{t("name")}</h1>

			<aside>
				<ul className={styles.info}>
					<li>
						<i className='fa fa-envelope'></i>
						<a href='mailto:aktasalper99@gmail.com' translate={false}>
							aktasalper99@gmail.com
						</a>
					</li>
					<li>
						<i className='fa fa-linkedin'></i>
						<a href='https://www.linkedin.com/in/aktasalper/' target='_blank'>
							/aktasalper/
						</a>
					</li>
					<li>
						<i className='fa fa-link'></i>
						<a href='https://www.aktasalper.com/' target='_blank'>
							aktasalper.com
						</a>
					</li>
					<li>
						<i className='fa fa-location-arrow'></i>
						<span>{t("location")}</span>
					</li>
				</ul>
			</aside>
		</header>
	);
}
