import styles from "./Education.module.scss";

export function Education(props: ResumeJSON["education"]["list"][number]) {
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
