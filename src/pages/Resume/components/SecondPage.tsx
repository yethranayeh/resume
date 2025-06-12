import { useTranslation } from "react-i18next";

import { ExperienceContent } from "./ExperienceContent";
import { ResumeSection } from "../../../components/Section";
import { Education } from "../../../components/Education";

import { itemCount } from "../../../i18n/en/text";
import styles from "./SecondPage.module.scss";
import { Reference } from "../../../components/Reference";

const getTypedString = (v: number) => v.toString() as "1";
const educationIndexes = new Array(itemCount.education)
	.fill(0)
	// So that it can count down like 3, 2, 1. Because the latest education info is at the end of list.
	.map((_, i) => getTypedString(itemCount.education - i));
const languageIndexes = new Array(itemCount.language).fill(0).map((_, i) => getTypedString(i + 1));
const referenceIndexes = new Array(itemCount.reference).fill(0).map((_, i) => getTypedString(i + 1));
export function SecondPage() {
	const { t, i18n } = useTranslation("resume");

	return (
		<page size='A4'>
			<div
				className={styles.printHack}
				style={{
					"--cutoff": i18n.language === "en" ? "-760px" : "-740px"
				}}>
				<ExperienceContent />
				<div className='lower-grid '>
					<div className='education'>
						<ResumeSection title={t("education.title")}>
							{educationIndexes.map((itemIndex) => (
								<Education
									key={itemIndex}
									institution={t(`education.${itemIndex}.institution`)}
									field={t(`education.${itemIndex}.field`)}
									instructor={t(`education.${itemIndex}.instructor`, { defaultValue: "" })}
									period={t(`education.${itemIndex}.period`)}
								/>
							))}
						</ResumeSection>
					</div>

					<div className='languages'>
						<ResumeSection title={t("language.title")} style={{ paddingBottom: 2 }}>
							<div>
								{languageIndexes.map((langIndex) => (
									<div key={langIndex}>
										{t(`language.${langIndex}.name`)} -{" "}
										<span className='text-caption'>{t(`language.${langIndex}.fluency`)}</span>
									</div>
								))}
							</div>
						</ResumeSection>
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
						</ResumeSection>
					</div>
				</div>
			</div>
		</page>
	);
}
