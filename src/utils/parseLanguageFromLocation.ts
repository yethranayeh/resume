const isLanguageValid = (languageKey: string) => languageKey === "en" || languageKey === "tr";

export function parseLanguageFromLocation(location: string) {
	const pathSegments = location.split("/").filter(Boolean);

	// The language is the segment after "resume" or default to 'en'
	let language = "en";

	if (pathSegments.length > 0) {
		const lastSegment = pathSegments.slice(-1)[0];
		if (isLanguageValid(lastSegment)) {
			language = lastSegment;
		}
	}

	return language;
}
