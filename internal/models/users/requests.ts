export interface IGetUsersRequest {
	limit: number;
	offset: number;
}

export interface IGetUserRequest {
	id: number;
}

export interface ICreateUserRequest {
	name: string;
}
