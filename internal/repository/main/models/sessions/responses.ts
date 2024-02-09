import { IMainSession } from './model'

export interface IMainGetSessionsResponse {
	sessions: IMainSession[];
	total: number;
}
