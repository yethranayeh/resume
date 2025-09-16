import { useTranslation } from "react-i18next";
import { itemCount } from "../../i18n/en/text";
import { getTypedString } from "../../utils/getTypedString";
import { ResumeSection } from "../Section";
import { Education } from "./Education";
const educationIndexes = new Array(itemCount.education)
	.fill(0)
	// So that it can count down like 3, 2, 1. Because the latest education info is at the end of list.
	.map((_, i) => getTypedString(itemCount.education - i));
export function EducationContent() {
	const { t } = useTranslation("resume");

	return (
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
	);
}
