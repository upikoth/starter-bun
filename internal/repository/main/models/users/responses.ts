import { IMainUser } from './model'

export interface IMainGetUsersResponse {
	users: IMainUser[];
	total: number;
}
