export interface IMainCreateRegistrationRequest {
	email: string;
	password: string;
	passwordHash: string,
	passwordSalt: string,
	activationToken: string
}

export interface IMainGetRegistrationsRequest {
	limit: number;
	offset: number;
}
