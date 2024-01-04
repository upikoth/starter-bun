import type { IUser } from '@/models'

import type { IRegistration } from './model'

export interface IGetRegistrationsResponse {
	registrations: IRegistration[];
	limit: number;
	offset: number;
	total: number;
}

export interface ICreateRegistrationResponse {
	registration: IRegistration;
}

export interface IConfirmRegistrationResponse {
	user: IUser;
}
