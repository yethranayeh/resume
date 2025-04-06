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
			<p className='text-bold'>{props.institution}</p>
			<p>{props.field}</p>
			{props.instructor && (
				<p className={styles.instructor}>
					<i className='fa fa-user'></i> {props.instructor}
				</p>
			)}

			<p className='text-caption'>{props.period}</p>
		</div>
	);
}
