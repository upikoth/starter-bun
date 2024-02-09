CREATE TABLE `files` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`s3_id` text NOT NULL,
	`uploaded_by_user_id` integer NOT NULL,
	FOREIGN KEY (`uploaded_by_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
