import styles from "./Reference.module.scss";

export function Reference(ref: ResumeJSON["reference"]["list"][number]) {
	return (
		<div className={styles.container}>
			<p className='text-bold'>{ref.name}</p>
			<p>
				{ref.title}
				<span className='text-medium'>{ref.company && ` - ${ref.company}`}</span>
			</p>
			<a href={`tel:${ref.phone}`}>
				<i className='fa fa-phone'></i> {ref.phone}
			</a>
			<a href={`mailto:${ref.email}`}>
				<i className='fa fa-envelope'></i> {ref.email}
			</a>
		</div>
	);
}
