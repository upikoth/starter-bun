import type { ErrorCodeEnum } from '@internal/constants'

export enum HttpMethod {
	Get = 'GET',
	Put = 'PUT',
	Post = 'POST',
	Patch = 'PATCH',
	Delete = 'DELETE',
}

export interface IError {
	code: ErrorCodeEnum,
	description: string
}

export enum ErorrStatusEnum {
	NotFound = 404,
	InternalServerError = 500
}
