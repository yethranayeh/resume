import { ResumeHeader } from "../../../components/Header";
import { ExperienceContent } from "./ExperienceContent";

export function FirstPage({ lang }: { lang: LangOption }) {
	return (
		<page size='A4'>
			<main>
				<ResumeHeader />
				<h2 className='vocation'>Frontend Developer</h2>

				{lang === "en" && (
					<p className='text-medium' style={{ paddingLeft: "2mm" }}>
						Eligible to work in EU countries<span style={{ color: "crimson" }}>*</span> (Bulgarian Citizenship)
					</p>
				)}

				<div
					className='exp-1'
					style={{
						"--cutoff": lang === "en" ? "170px" : "200px"
					}}>
					<ExperienceContent lang={lang} />
				</div>
			</main>
		</page>
	);
}
