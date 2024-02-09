ALTER TABLE registrations ADD `activation_token` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `registrations_activation_token_unique` ON `registrations` (`activation_token`);