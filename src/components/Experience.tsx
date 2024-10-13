import styles from "./Experience.module.scss";

interface ExperienceProps {
	company: string;
	title: string;
	period: { start: string; end?: string };
	description: string;
	roles: Array<{ project: string; description: string; stack: Array<string> }>;
}

export const ResumeExperience = ({ company, title, period, description, roles }: ExperienceProps) => (
	<div className={styles.container}>
		<div className={styles.companyInfoContainer}>
			<h3 className='text-bold'>{company}</h3>
			<div className={styles.periodContainer}>
				<span className='text-caption'>{period.start}</span>
				<span className='text-caption'>{period.end ?? "Present"}</span>
			</div>
		</div>

		<div className={styles.experienceInfoContainer}>
			<div className={styles.experienceSummary}>
				<h3 className='text-bold'>{title}</h3>
				<p>{description}</p>
			</div>

			{roles.map((role) => (
				<div key={role.project} className={styles.projectContainer}>
					<h4 className='text-medium '>{role.project}</h4>
					<p>{role.description}</p>
					<div className={styles.stackContainer}>
						<ul className={styles.techStack}>
							{role.stack.map((tech) => (
								<li key={tech} className={styles.stack}>
									{tech}
								</li>
							))}
						</ul>
						<i className='fa fa-code'></i>
					</div>
				</div>
			))}
		</div>
	</div>
);
