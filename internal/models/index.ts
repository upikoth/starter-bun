import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

export * from './users'
export * from './files'
export * from './sessions'
export * from './registrations'

export interface ICustomError {
	code: ErrorCodeEnum
	status: ErrorStatusEnum
	description: string
}

export interface IResponseError {
	code: ErrorCodeEnum,
	description: string
}
