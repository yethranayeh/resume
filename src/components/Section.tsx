import type { HTMLProps } from "react";
import styles from "./Section.module.scss";

export const ResumeSection = ({
	children,
	title,
	hideTitle,
	...props
}: HTMLProps<HTMLElement> & { hideTitle?: boolean }) => (
	<section {...props} className={styles.section}>
		{!hideTitle && (
			<div className={styles.titleContainer}>
				<h2 className={styles.title}>{title}</h2>
			</div>
		)}

		<article className={styles.content}>{children}</article>
	</section>
);
