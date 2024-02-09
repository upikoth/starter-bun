import type {
	UserRoleEnum,
	UserStatusEnum
} from '@/models'

export interface IMainCreateUserRequest {
	email: string;
	role: UserRoleEnum;
	passwordHash: string;
	passwordSalt: string;
}

export interface IMainGetUsersRequest {
	limit: number;
	offset: number;
	status?: UserStatusEnum
}

export interface IMainUpdateUserRequest {
	id: number;
	role?: UserRoleEnum;
	status?: UserStatusEnum;
}
