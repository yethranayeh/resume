import contentTR from "../../i18n/tr/content.json";
import contentEN from "../../i18n/en/content.json";

export function getResumeContent(lang: LangOption) {
	return (lang === "en" ? contentEN : contentTR).resume;
}
