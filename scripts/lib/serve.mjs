import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const TYPES = {
	".html": "text/html; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".json": "application/json; charset=utf-8",
	".svg": "image/svg+xml",
	".png": "image/png",
	".jpg": "image/jpeg",
	".pdf": "application/pdf",
	".woff2": "font/woff2",
	".woff": "font/woff"
};

/**
 * Serves `root` at `mount` on an ephemeral port.
 *
 * The public build uses root-relative asset URLs (/resume/assets/...), the
 * private build uses relative ones, so callers pick the mount accordingly.
 */
export async function serveDist(root, mount = "/resume/") {
	const base = resolve(root);
	const prefix = mount.endsWith("/") ? mount : `${mount}/`;

	const server = createServer(async (request, response) => {
		try {
			const url = new URL(request.url ?? "/", "http://localhost");
			const pathname = decodeURIComponent(url.pathname);

			if (!pathname.startsWith(prefix)) {
				response.writeHead(404).end("not found");
				return;
			}

			let relative = pathname.slice(prefix.length);
			if (relative === "" || relative.endsWith("/")) relative += "index.html";

			const file = resolve(join(base, normalize(relative)));
			if (!file.startsWith(base)) {
				response.writeHead(403).end("forbidden");
				return;
			}

			const info = await stat(file);
			if (!info.isFile()) throw new Error("not a file");

			const body = await readFile(file);
			response.writeHead(200, {
				"content-type": TYPES[extname(file)] ?? "application/octet-stream",
				"content-length": body.length
			});
			response.end(body);
		} catch {
			response.writeHead(404).end("not found");
		}
	});

	await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
	const { port } = server.address();

	return {
		origin: `http://127.0.0.1:${port}`,
		mount: prefix,
		close: () => new Promise((resolveClose) => server.close(resolveClose))
	};
}
