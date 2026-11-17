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
		// Root-relative so the prerenderer can serve dist/ at the same /resume/
		// path the deployed site uses. The private build is printed locally and
		// never deployed, so it keeps relative paths.
		base: isPrivate ? "./" : "/resume/",
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
