export interface IMainCreateSessionRequest {
	userId: number;
	session: string
}

export interface IMainGetSessionsRequest {
	limit: number;
	offset: number;
}
