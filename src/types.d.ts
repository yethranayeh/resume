const json = import("./i18n/en/content.json");
type ResumeJSON = Awaited<typeof json>["resume"];
