import { useTranslation } from "react-i18next";

const languages = [
	{ code: "en", label: "EN", href: "/resume/" },
	{ code: "de", label: "DE", href: "/resume/de/" },
	{ code: "tr", label: "TR", href: "/resume/tr/" }
];

export function Navbar() {
	const { i18n } = useTranslation();
	const language = i18n.language;
	const pdf =
		language === "de" ? "/resume/lebenslauf-alper-halil.pdf" : "/resume/alper-halil-resume.pdf";

	return (
		<nav className='no-print toolbar' aria-label='Language and download'>
			{languages.map(({ code, label, href }) => (
				<a key={code} href={href} aria-current={language === code ? "page" : undefined}>
					{label}
				</a>
			))}
			<a href={pdf}>PDF</a>
		</nav>
	);
}
