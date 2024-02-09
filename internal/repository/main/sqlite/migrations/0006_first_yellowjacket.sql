CREATE TABLE `sessions` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`session` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
