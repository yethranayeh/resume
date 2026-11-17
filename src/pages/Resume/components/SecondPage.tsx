import { useTranslation } from "react-i18next";

import contact from "@contact";

import { ExperienceContent } from "./ExperienceContent";
import { ResumeSection } from "../../../components/Section";
import { Reference } from "../../../components/Reference";
import { EducationContent } from "../../../components/Education/EducationContent";

import styles from "./SecondPage.module.scss";

export function SecondPage() {
	const { t, i18n } = useTranslation("resume");

	// Empty in the public build -- referee contact details are third-party
	// personal data and ship only in the private/print build.
	const references = contact.references;

	return (
		<page size='A4'>
			<div
				className={styles.printHack}
				style={{
					"--cutoff": i18n.language === "en" ? "-1mm" : "-740px"
				}}>
				<ExperienceContent hideTitle cutoffPoint={{ companyIndex: 1 }} />
				<div className={`lower-grid ${references.length === 0 ? styles.noReferences : ""}`}>
					<div className='education'>
						<EducationContent />
					</div>

					{references.length > 0 && (
						<div className='references'>
							<ResumeSection title={t("reference.title")}>
								{references.map((reference) => (
									<Reference
										key={reference.email ?? reference.name}
										name={reference.name}
										title={reference.title}
										company={reference.company}
										phone={reference.phone}
										email={reference.email}
									/>
								))}
								<div
									style={{
										minHeight: "2.3mm"
									}}
								/>
							</ResumeSection>
						</div>
					)}
				</div>
			</div>
		</page>
	);
}
