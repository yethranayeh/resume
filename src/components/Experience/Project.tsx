import { PropsWithChildren } from "preact/compat";

import styles from "./Project.module.scss";

interface Props extends PropsWithChildren {
	title: string;
	description: string;
}

export const Project = ({ title, description, children }: Props) => (
	<div className={styles.projectContainer}>
		<h4 className='text-medium '>{title}</h4>
		<p>{description}</p>
		<div className={styles.stackContainer}>
			<ul className={styles.techStack}>{children}</ul>
			<i className='fa fa-code'></i>
		</div>
	</div>
);
