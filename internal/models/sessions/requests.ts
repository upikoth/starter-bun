import type { paths, components } from '@/models/schema'

type GetSessionsRequest = Required<NonNullable<paths['/api/v1/sessions']['get']['parameters']['query']>>

export interface IGetSessionsRequest extends GetSessionsRequest {}

type CreateSessionRequest = components['schemas']['sessionsCreateSessionBodyRequest']

export interface ICreateSessionRequest extends CreateSessionRequest {}

type DeleteSessionRequest = paths['/api/v1/sessions/{id}']['delete']['parameters']['path']

export interface IDeleteSessionRequest extends DeleteSessionRequest {}
