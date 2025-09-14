import resumeJson from "./resume.json";

export const resume = resumeJson;
export const englishText = { resume } as const;
export const itemCount = {
	education: Object.keys(resume.education).length - 2, // except "title" and "language"
	language: Object.keys(resume.education.language).length, // since there is no "title" field, no exception
	reference: Object.keys(resume.reference).length - 1 // except "title" field
};
