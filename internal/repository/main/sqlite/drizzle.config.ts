import type { Config } from 'drizzle-kit'

export default {
	schema: './internal/repository/sqlite/schema.ts',
	out: './internal/repository/sqlite/migrations',
	driver: 'libsql',
	dbCredentials: { url: 'database.sqlite' }
} satisfies Config
