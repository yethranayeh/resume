import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright-core";

import { serveDist } from "./lib/serve.mjs";

const DIST = "dist";
const SITE = "https://www.aktasalper.com/resume";
const LOCALES = ["en", "de", "tr"];

const contact = JSON.parse(await readFile("src/data/contact.public.json", "utf8"));

const meta = {};
for (const locale of LOCALES) {
	const text = JSON.parse(await readFile(`src/i18n/${locale}/resume.json`, "utf8"));
	meta[locale] = {
		title: text.meta.title,
		description: text.meta.description,
		jobTitle: text.meta.jobTitle,
		path: locale === "en" ? "/" : `/${locale}/`,
		pdf: locale === "de" ? "lebenslauf-alper-halil.pdf" : "alper-halil-resume.pdf"
	};
}

const escape = (value) =>
	value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

const alternates = LOCALES.map(
	(locale) => `<link rel="alternate" hreflang="${locale}" href="${SITE}${meta[locale].path}">`
).join("\n\t\t");

function headFor(locale) {
	const { title, description, path, pdf } = meta[locale];
	const canonical = `${SITE}${path}`;
	const person = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Alper Halil",
		jobTitle: meta[locale].jobTitle,
		email: contact.email,
		url: canonical,
		address: {
			"@type": "PostalAddress",
			addressLocality: "Würzburg",
			addressCountry: "DE"
		},
		sameAs: [
			"https://www.linkedin.com/in/aktasalper",
			"https://github.com/yethranayeh",
			"https://www.aktasalper.com/",
			"https://zinn.sh"
		]
	};

	return `
		<meta name="description" content="${escape(description)}">
		<meta name="author" content="Alper Halil">
		<link rel="canonical" href="${canonical}">
		${alternates}
		<link rel="alternate" hreflang="x-default" href="${SITE}/">
		<link rel="alternate" type="application/pdf" href="${SITE}/${pdf}">
		<meta property="og:type" content="profile">
		<meta property="og:title" content="${escape(title)}">
		<meta property="og:description" content="${escape(description)}">
		<meta property="og:url" content="${canonical}">
		<meta property="og:locale" content="${locale === "de" ? "de_DE" : locale === "tr" ? "tr_TR" : "en_US"}">
		<meta property="profile:first_name" content="Alper">
		<meta property="profile:last_name" content="Halil">
		<meta name="twitter:card" content="summary">
		<meta name="twitter:title" content="${escape(title)}">
		<meta name="twitter:description" content="${escape(description)}">
		<script type="application/ld+json">${JSON.stringify(person)}</script>`;
}

const server = await serveDist(DIST);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const rendered = [];

try {
	for (const locale of LOCALES) {
		const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
		const url = `${server.origin}${server.mount}${locale === "en" ? "" : `#/${locale}`}`;
		await page.goto(url, { waitUntil: "networkidle" });
		await page.waitForFunction(
			(marker) => document.querySelector("main")?.innerText.includes(marker),
			{ en: "Experience", de: "Berufserfahrung", tr: "Deneyim" }[locale]
		);
		await page.evaluate(() => document.fonts.ready);

		let html = await page.content();
		html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
		html = html.replace(/<link[^>]+rel="modulepreload"[^>]*>/gi, "");
		html = html.replace(/<html[^>]*>/, `<html lang="${locale}">`);
		html = html.replace(/<title>.*?<\/title>/s, `<title>${escape(meta[locale].title)}</title>`);
		html = html.replace("</head>", `${headFor(locale)}\n\t</head>`);

		if (!html.includes("Alper Halil")) throw new Error(`${locale}: name missing from output`);
		if (!html.includes("Etstur")) throw new Error(`${locale}: Etstur missing from output`);
		if (!html.includes("Zinn")) throw new Error(`${locale}: Zinn missing from output`);
		if (html.includes('type="module"')) throw new Error(`${locale}: script tag survived`);
		if (html.length < 8_000) throw new Error(`${locale}: suspiciously small (${html.length})`);

		rendered.push({ locale, html });
		console.log(`${locale}: captured (${html.length} bytes)`);
		await page.close();
	}
} finally {
	await browser.close();
}

// Write only after every locale has been captured: writing index.html first
// would replace the SPA shell the hash routes need for the remaining locales.
for (const { locale, html } of rendered) {
	const directory = locale === "en" ? DIST : join(DIST, locale);
	await mkdir(directory, { recursive: true });
	await writeFile(join(directory, "index.html"), html);
	console.log(`${locale}: ${join(directory, "index.html")}`);
}

await server.close();

// The deployed pages are static. Remove the client bundles so nothing can
// hydrate over the prerendered markup or reintroduce a JS-only page.
for (const file of await readdir(join(DIST, "assets"))) {
	if (file.endsWith(".js")) {
		const { unlink } = await import("node:fs/promises");
		await unlink(join(DIST, "assets", file));
		console.log(`removed ${join(DIST, "assets", file)}`);
	}
}
