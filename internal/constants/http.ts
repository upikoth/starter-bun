export enum ErrorStatusEnum {
	Success = 200,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	InternalServerError = 500
}

export enum HttpMethod {
	Get = 'GET',
	Put = 'PUT',
	Post = 'POST',
	Patch = 'PATCH',
	Delete = 'DELETE',
}

export enum HttpHeaderEnum {
	SetCookie = 'Set-Cookie',
}

export const AUTHORIZATION_HEADER = 'Authorization'
