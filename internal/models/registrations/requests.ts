export interface IGetRegistrationsRequest {
	limit: number;
	offset: number;
}

export interface ICreateRegistrationRequest {
	email: string;
	password: string;
}

export interface IConfirmRegistrationRequest {
	token: string;
}

export interface IDeleteRegistrationRequest {
	id: number;
}
