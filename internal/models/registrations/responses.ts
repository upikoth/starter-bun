import type { IUser } from '@/models'

import type { IRegistration } from './model'

export interface ICreateRegistrationResponse {
	registration: IRegistration;
}

export interface IConfirmRegistrationResponse {
	user: IUser;
}
