import { useEffect } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { parseLanguageFromLocation } from "../utils/parseLanguageFromLocation";
import { useLocation } from "react-router-dom";

export function LanguageHandler() {
	const { i18n } = useTranslation();
	const location = useLocation();
	useEffect(() => {
		const language = parseLanguageFromLocation(location.pathname);
		i18n.changeLanguage(language);
	}, [location.pathname]);

	return null;
}
