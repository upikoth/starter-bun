import type { IUser, ISession } from '@/models'

export type IGetSessionsResponseSession = Omit<ISession, 'session'>

export interface IGetSessionsResponse {
	sessions: IGetSessionsResponseSession[];
	limit: number;
	offset: number;
	total: number;
}

export interface ICreateSessionResponse {
	session: {
		id: number;
	},
	user: IUser;
}

export interface IGetCurrentSessionResponse {
	session: {
		id: number;
	},
	user: IUser;
}
