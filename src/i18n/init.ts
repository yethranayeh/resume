import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { defaultNS, i18nResources, namespaces } from "./config";
import { parseLanguageFromLocation } from "../utils/parseLanguageFromLocation";

const pageLanguage = parseLanguageFromLocation(window.location.href);

i18next
	.use(initReactI18next)
	// @ts-expect-error FIXME: adding namespaces causes type error
	.init({
		lng: pageLanguage,
		// Resolve synchronously so the first render already uses the locale from
		// the URL. The prerenderer captures the DOM immediately after load.
		initImmediate: false,
		debug: false,
		resources: i18nResources,
		namespaces,
		defaultNS,
		returnEmptyString: true
	});
