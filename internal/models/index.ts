import { ErrorCodeEnum } from '@/constants'
import { ErorrStatusEnum } from '@/constants'

export * from './users'
export * from './sessions'

export interface ICustomError {
	code: ErrorCodeEnum
	status: ErorrStatusEnum
	description: string
}

export interface IResposeError {
	code: ErrorCodeEnum,
	description: string
}
