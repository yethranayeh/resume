import resumeJson from "./resume.json";

export const resume = resumeJson;
export const englishText = { resume } as const;
export const itemCount = {
	education: Object.keys(resume.education).length - 1 // except "title" field
};
