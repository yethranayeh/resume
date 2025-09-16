import { useTranslation } from "react-i18next";

import { ExperienceContent } from "./ExperienceContent";
import { ResumeSection } from "../../../components/Section";
import { Reference } from "../../../components/Reference";

import { itemCount } from "../../../i18n/en/text";

import styles from "./SecondPage.module.scss";
import { EducationContent } from "../../../components/Education/EducationContent";
import { getTypedString } from "../../../utils/getTypedString";

const referenceIndexes = new Array(itemCount.reference).fill(0).map((_, i) => getTypedString(i + 1));
export function SecondPage() {
	const { t, i18n } = useTranslation("resume");

	return (
		<page size='A4'>
			<div
				className={styles.printHack}
				style={{
					"--cutoff": i18n.language === "en" ? "-1mm" : "-740px"
				}}>
				<ExperienceContent hideTitle cutoffPoint={{ companyIndex: 1 }} />
				<div className='lower-grid '>
					<div className='education'>
						<EducationContent />
					</div>

					<div className='references'>
						<ResumeSection title={t("reference.title")}>
							{referenceIndexes.map((referenceIndex) => (
								<Reference
									key={referenceIndex}
									name={t(`reference.${referenceIndex}.name`)}
									title={t(`reference.${referenceIndex}.title`)}
									company={t(`reference.${referenceIndex}.company`)}
									phone={t(`reference.${referenceIndex}.phone`)}
									email={t(`reference.${referenceIndex}.email`)}
								/>
							))}
							<div
								style={{
									minHeight: "2.3mm"
								}}
							/>
						</ResumeSection>
					</div>
				</div>
			</div>
		</page>
	);
}
