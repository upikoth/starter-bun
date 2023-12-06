import environment from '@internal/environment';

import { responseNotFound } from '@internal/controller/http.cont'

export function startServer(): void {
	const router = new Bun.FileSystemRouter({
		style: 'nextjs',
		dir: 'internal/controller',
	});

	Bun.serve({
		port: environment.APP_PORT,
		async fetch(req) {
			const filePath = router.match(req)?.filePath

			if (typeof filePath !== 'string') {
				return responseNotFound
			}

			const module = await import(filePath)
			
			if (typeof module !== 'object' || typeof module.default !== 'function') {
				return responseNotFound
			}

			const handler = module.default

			return handler(req)
		},
	});
}
