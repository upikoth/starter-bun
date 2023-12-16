import type { IUser } from './model'

export interface IGetUsersResponse {
	users: IUser[];
	limit: number;
	offset: number;
	total: number;
}

export interface IGetUserResponse {
	user: IUser;
}

export interface ICreateUserResponse {
	user: IUser;
}

export interface IUpdateUserResponse {
	user: IUser;
}
