import type { Config } from 'drizzle-kit'

export default {
	schema: './internal/repository/main/sqlite/schema.ts',
	out: './internal/repository/main/sqlite/migrations',
	driver: 'libsql',
	dbCredentials: { url: 'database.sqlite' }
} satisfies Config
