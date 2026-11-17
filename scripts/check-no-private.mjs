#!/usr/bin/env node
/**
 * Leak guard.
 *
 * `dist/` is tracked in this public repo and subtree-pushed to gh-pages, so any
 * private value that reaches a public build gets published twice -- once on the
 * live site and once, permanently, in git history. That is exactly how two
 * former colleagues' mobile numbers ended up public.
 *
 * This fails the build if any value from contact.private.json appears anywhere
 * in the public output, or anywhere in tracked source.
 *
 * Runs automatically via `prepipeline`. Do not bypass it.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PRIVATE_FILE = join(ROOT, "src/data/contact.private.json");
// Defaults are what gets committed and deployed. Pass directories explicitly to
// scan something else -- e.g. `npm run check:private -- dist-private` should
// FAIL, which is how you verify the guard still works.
const SCAN_DIRS = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
if (SCAN_DIRS.length === 0) SCAN_DIRS.push("dist", "src");
const SKIP_FILES = new Set([PRIVATE_FILE]);

if (!existsSync(PRIVATE_FILE)) {
	console.log("check-no-private: no contact.private.json present, nothing to guard against.");
	process.exit(0);
}

// Guard contact identifiers, not incidental biography. A referee's `company`
// is "Etstur", which legitimately appears throughout the resume -- guarding
// every leaf string flags the whole file and trains you to ignore the guard.
const SENSITIVE_KEYS = /^(email|phone|mobile|tel|name|address)$/i;
const IGNORED_KEYS = /^(_comment|company|title|links)$/i;

const looksLikeEmail = (value) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
const looksLikePhone = (value) => /^\+?[\d][\d\s()-]{7,}$/.test(value);

/** Leaf strings worth guarding, from arbitrarily nested private data. */
function collectSecrets(node, out = new Set(), key = "") {
	if (typeof node === "string") {
		const value = node.trim();
		if (value.length < 6) return out; // too short to match uniquely
		if (IGNORED_KEYS.test(key)) return out;
		if (SENSITIVE_KEYS.test(key) || looksLikeEmail(value) || looksLikePhone(value)) {
			out.add(value);
		}
	} else if (Array.isArray(node)) {
		for (const item of node) collectSecrets(item, out, key);
	} else if (node && typeof node === "object") {
		for (const [childKey, item] of Object.entries(node)) {
			if (IGNORED_KEYS.test(childKey)) continue;
			collectSecrets(item, out, childKey);
		}
	}
	return out;
}

const priv = JSON.parse(readFileSync(PRIVATE_FILE, "utf8"));
const publicFile = join(ROOT, "src/data/contact.public.json");
const publicValues = existsSync(publicFile)
	? collectSecrets(JSON.parse(readFileSync(publicFile, "utf8")))
	: new Set();

// A value that also appears in the public file is public by decision (the
// shared links), so it is not a leak.
const secrets = [...collectSecrets(priv)].filter((value) => !publicValues.has(value));

// Phone numbers get reformatted by bundlers/minifiers less than they get
// rewritten by humans; also check a whitespace-stripped variant.
const needles = new Set();
for (const secret of secrets) {
	needles.add(secret);
	const compact = secret.replace(/[\s()-]/g, "");
	if (compact.length >= 6) needles.add(compact);
}

function* walk(dir) {
	if (!existsSync(dir)) return;
	for (const entry of readdirSync(dir)) {
		if (entry === "node_modules" || entry === ".git") continue;
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) yield* walk(full);
		else yield full;
	}
}

const findings = [];
for (const dir of SCAN_DIRS) {
	for (const file of walk(join(ROOT, dir))) {
		if (SKIP_FILES.has(file)) continue;
		let text;
		try {
			text = readFileSync(file, "utf8");
		} catch {
			continue; // binary or unreadable
		}
		const compact = text.replace(/[\s()-]/g, "");
		for (const needle of needles) {
			if (text.includes(needle) || compact.includes(needle)) {
				findings.push({ file: file.slice(ROOT.length + 1), length: needle.length });
				break;
			}
		}
	}
}

if (findings.length > 0) {
	console.error("\n  check-no-private: PRIVATE VALUES FOUND IN PUBLIC OUTPUT\n");
	for (const { file, length } of findings) {
		// Report the location, never the value.
		console.error(`    ${file}  (matched a ${length}-character private value)`);
	}
	console.error(
		"\n  Refusing to continue. This would publish the value to the live site and to\n" +
			"  git history permanently. Run `npm run build` (public mode) before deploying --\n" +
			"  a private build in dist/ is the usual cause.\n"
	);
	process.exit(1);
}

console.log(`check-no-private: OK -- ${needles.size} guarded values, none present in dist/ or src/.`);
