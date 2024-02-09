CREATE TABLE `registrations` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`password_salt` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `registrations_email_unique` ON `registrations` (`email`);