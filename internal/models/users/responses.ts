import type { IUser } from './model'

export interface IGetUsersResponse {
	users: IUser[];
	limit: number;
	offset: number;
}
