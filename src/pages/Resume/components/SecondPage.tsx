import { EducationContent } from "../../../components/Education/EducationContent";
import { ProjectsContent } from "../../../components/Projects/ProjectsContent";
import { ExperienceContent } from "./ExperienceContent";

import styles from "./SecondPage.module.scss";

export function SecondPage() {
	return (
		<page size='A4'>
			<main>
				<ExperienceContent fromCompany={2} />
				<div className={styles.lowerGrid}>
					<div>
						<ProjectsContent />
					</div>
					<div>
						<EducationContent />
					</div>
				</div>
			</main>
		</page>
	);
}
