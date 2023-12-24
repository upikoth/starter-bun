export enum UserStatusEnum {
	Active = 'active',
	Blocked = 'blocked'
}

export interface IUser {
	id: number;
	email: string;
	status: UserStatusEnum;
}
