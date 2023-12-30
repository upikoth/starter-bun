export interface IGetSessionsRequest {
	limit: number;
	offset: number;
}

export interface ICreateSessionRequest {
	email: string;
	password: string;
}

export interface IDeleteSessionRequest {
	id: number;
}
