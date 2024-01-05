import type { UserStatusEnum } from './model'

export interface IGetUsersRequest {
	limit: number;
	offset: number;
	status?: UserStatusEnum
}

export interface IGetUserRequest {
	id: number;
}

export interface ICreateUserRequest {
	email: string;
	password: string;
}

export interface IUpdateUserRequest {
	id: number;
	status?: UserStatusEnum;
}
