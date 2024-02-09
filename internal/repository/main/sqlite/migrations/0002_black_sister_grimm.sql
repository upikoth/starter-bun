ALTER TABLE users ADD `email` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `name`;