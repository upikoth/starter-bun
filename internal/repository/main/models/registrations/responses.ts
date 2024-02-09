import { IMainRegistration } from './model'

export interface IMainGetRegistrationsResponse {
	total: number;
	registrations: IMainRegistration[];
}
