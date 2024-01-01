import type { ICustomError } from '@/models'

export function checkIsCustomError(error: unknown): error is ICustomError {
	return typeof error === 'object' &&
		typeof (error as ICustomError).description === 'string' &&
		typeof (error as ICustomError).status === 'number' &&
		typeof (error as ICustomError).code === 'number'
}
