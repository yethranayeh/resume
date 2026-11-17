import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright-core";
import { PDFDocument } from "pdf-lib";

import { serveDist } from "./lib/serve.mjs";

const modeIndex = process.argv.indexOf("--mode");
const mode = modeIndex === -1 ? "public" : process.argv[modeIndex + 1];
const isPrivate = mode === "private";

const directory = isPrivate ? "dist-private" : "dist";
const mount = isPrivate ? "/" : "/resume/";

const targets = [
	{
		label: "en",
		url: isPrivate ? "index.html" : "",
		file: "alper-halil-resume.pdf"
	},
	{
		label: "de",
		url: isPrivate ? "index.html#/de" : "de/",
		file: "lebenslauf-alper-halil.pdf"
	}
];

const server = await serveDist(directory, mount);
const browser = await chromium.launch({ channel: "chrome", headless: true });

try {
	for (const { label, url, file } of targets) {
		const page = await browser.newPage();
		await page.goto(`${server.origin}${server.mount}${url}`, { waitUntil: "networkidle" });
		await page.waitForSelector("page[size='A4']");
		await page.evaluate(() => document.fonts.ready);

		const overflow = await page.evaluate(() =>
			[...document.querySelectorAll("page")].map((sheet) => sheet.scrollHeight - sheet.clientHeight)
		);
		if (overflow.some((amount) => amount > 2)) {
			throw new Error(`${file}: content clipped by ${overflow.join(", ")}px`);
		}

		const path = join(directory, file);
		await page.pdf({ path, printBackground: true, preferCSSPageSize: true });

		const pdf = await PDFDocument.load(await readFile(path));
		const pages = pdf.getPageCount();
		if (pages !== 2) throw new Error(`${file}: expected 2 pages, got ${pages}`);
		console.log(`${label}: ${path} (${pages} pages)`);
		await page.close();
	}
} finally {
	await browser.close();
	await server.close();
}
