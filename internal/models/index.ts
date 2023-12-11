import { ErrorCodeEnum } from '@internal/constants'
import { ErorrStatusEnum } from '@internal/constants'

export * from './users'

export interface ICustomError {
	code: ErrorCodeEnum
	status: ErorrStatusEnum
	description: string
}
