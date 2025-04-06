import { englishText } from "./en/text";
import { turkishText } from "./tr/text";

export type I18nResource = typeof englishText;
export type Namespace = keyof I18nResource;
export const namespaces: Array<Namespace> = Object.keys(englishText) as any;
export const defaultNS = namespaces[0];
export const i18nResources = {
	en: englishText,
	tr: turkishText
};
