import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'

import * as schema from './schema'


const sqlite = new Database('database.sqlite')
export const db = drizzle(sqlite, { schema })

export function migrateIfNeeded(): void {
	migrate(db, { migrationsFolder: `${import.meta.dir}/migrations` })
}
