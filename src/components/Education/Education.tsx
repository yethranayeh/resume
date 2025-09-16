import styles from "./Education.module.scss";

interface Props {
	institution: string;
	field: string;
	instructor?: string;
	period: string;
}

export function Education(props: Props) {
	return (
		<div className={styles.container}>
			<p className='text-bold'>
				{props.institution} <span className='text-caption'>{props.period}</span>
			</p>
			<p>{props.field}</p>
		</div>
	);
}
