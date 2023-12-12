export type UserStatus = 'active' | 'archived'

export interface IUser {
	id: number;
	name: string;
	status: UserStatus;
}
