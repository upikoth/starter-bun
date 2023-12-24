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
}

export interface IUpdateUserRequest {
	id: number;
	email?: string;
	status?: UserStatusEnum;
}
