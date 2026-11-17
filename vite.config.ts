import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// Contact details are swapped at build time, not gated at runtime: a runtime
// flag would still ship the real values inside the public bundle. See
// src/data/README.md.
// (Resolved without node:url so the config needs no @types/node.)
const contactModule = (file: string) =>
	decodeURIComponent(new URL(`./src/data/${file}`, import.meta.url).pathname);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const isPrivate = mode === "private";

	return {
		plugins: [preact()],
		// The private build is printed to PDF locally and never deployed, so it
		// wants relative asset paths rather than the public site's absolute base.
		base: isPrivate ? "./" : "https://www.aktasalper.com/resume/",
		build: {
			outDir: isPrivate ? "dist-private" : "dist"
		},
		resolve: {
			alias: {
				"@contact": contactModule(isPrivate ? "contact.private.json" : "contact.public.json")
			}
		}
	};
});
