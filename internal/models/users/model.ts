export enum UserStatusEnum {
	Active = 'active',
	Blocked = 'blocked'
}

export interface IUser {
	id: number;
	name: string;
	status: UserStatusEnum;
}
