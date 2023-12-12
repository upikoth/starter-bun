import type { IUser } from './model'

export interface IGetUsersResponse {
	users: IUser[];
	limit: number;
	offset: number;
}

export interface IGetUserResponse {
	user: IUser;
}

export interface ICreateUserResponse {
	user: IUser;
}
