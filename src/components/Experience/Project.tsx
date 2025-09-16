import styles from "./Project.module.scss";

interface Props {
	title: string;
	description: string;
}

export function Project({ title, description }: Props) {
	return (
		<li className={styles.li}>
			<span className='text-medium'>{title}</span>: {description}
		</li>
	);
}
