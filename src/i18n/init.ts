import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { defaultNS, i18nResources, namespaces } from "./config";

i18next.use(initReactI18next).init({
	lng: "en",
	debug: true,
	resources: i18nResources,
	namespaces,
	defaultNS,
	returnEmptyString: true
});
