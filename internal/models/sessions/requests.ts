export interface IGetSessionsRequest {
	limit: number;
	offset: number;
}

export interface ICreateSessionRequest {
	email: string;
	password: string;
}
