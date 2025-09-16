import type { HTMLProps } from "react";
import styles from "./Section.module.scss";

export const ResumeSection = ({
	children,
	title,
	hideTitle,
	...props
}: HTMLProps<HTMLElement> & { hideTitle?: boolean }) => (
	// @ts-expect-error
	<section {...props} className={styles.section}>
		{!hideTitle && <h2 className='header'>{title}</h2>}

		<article className={styles.content}>{children}</article>
	</section>
);
