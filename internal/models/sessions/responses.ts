import type { components } from '@/models/schema'

type GetSessionsResponseData = components['schemas']['sessionsGetAllSessionSuccessResponse']['data']

export interface IGetSessionsResponseData extends GetSessionsResponseData {}

type CreateSessionResponseData = components['schemas']['sessionsCreateSessionSuccessResponse']['data']

export interface ICreateSessionResponseData extends CreateSessionResponseData {}

type GetCurrentSessionResponseData = components['schemas']['sessionsGetCurrentSessionSuccessResponse']['data']

export interface IGetCurrentSessionResponseData extends GetCurrentSessionResponseData {}
