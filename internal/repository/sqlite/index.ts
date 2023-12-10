import { Database } from 'bun:sqlite'
import { migrate, getMigrations } from 'bun-sqlite-migrations'

export const db = new Database('database.sqlite')

export function migrateIfNeeded(): void {
	migrate(db, getMigrations(`${import.meta.dir}/migrations`))
}
