import styles from "./Reference.module.scss";

interface Props {
	name: string;
	title: string;
	company?: string;
	/** Third-party personal data: present only in the private build. */
	phone?: string;
	email?: string;
}

export const Reference = (ref: Props) => (
	<div className={styles.container}>
		<p className='text-bold'>{ref.name}</p>
		<p>
			{ref.title}
			<span className='text-medium'>{ref.company && ` - ${ref.company}`}</span>
		</p>
		{ref.phone && <a href={`tel:${ref.phone}`}>{ref.phone}</a>}
		{ref.email && <a href={`mailto:${ref.email}`}>{ref.email}</a>}
	</div>
);
