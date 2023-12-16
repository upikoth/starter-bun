export type UserStatus = 'active' | 'blocked'

export interface IUser {
	id: number;
	name: string;
	status: UserStatus;
}
