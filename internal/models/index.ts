import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

export * from './users'
export * from './sessions'
export * from './registrations'

export interface ICustomError {
	code: ErrorCodeEnum
	status: ErorrStatusEnum
	description: string
}

export interface IResposeError {
	code: ErrorCodeEnum,
	description: string
}
