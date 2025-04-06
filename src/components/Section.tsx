import type { PropsWithChildren } from "react";
import styles from "./Section.module.scss";

export const ResumeSection = ({ children, title }: PropsWithChildren<{ title: string }>) => (
	<section className={styles.section}>
		<div className={styles.titleContainer}>
			<h2 className={styles.title}>{title}</h2>
		</div>

		<article className={styles.content}>{children}</article>
	</section>
);
