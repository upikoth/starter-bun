import { match } from 'path-to-regexp'

import { HttpMethod } from '@/constants'

import { checkIsUserHasAccessToAction } from '@/utils'

import {
	getUser as getUserFromFromService,
	getSessionById as getSessionByIdFromService,
	getFile as getFileFromService
} from '@/service'

import { IUser, UserActionEnum, UserRoleEnum } from '@/models'

import api from './api'

interface IRoute {
	pathname: string;
	method: HttpMethod;
	handler: (req: Request) => Promise<Response> | Response;
	authRequired: boolean;
	validateRights: (req: Request, user: IUser) => Promise<boolean> | boolean;
}

const routes: IRoute[] = [
	{
		pathname: '/api/v1/health',
		method: HttpMethod.Get,
		handler: api.v1.health.get,
		authRequired: false,
		validateRights: () => true
	},
	{
		pathname: '/api/v1/users/:id',
		method: HttpMethod.Get,
		handler(req: Request) {
			const url = new URL(req.url)
			const { params } = match('/api/v1/users/:id')(url.pathname) as { params: Record<string, string> }

			return api.v1.users.getById(req, params)
		},
		authRequired: true,
		validateRights: (req: Request, user: IUser) => {
			if (checkIsUserHasAccessToAction(user, UserActionEnum.GetAnyUserInfo)) {
				return true
			}

			const url = new URL(req.url)
			const { params } = match('/api/v1/users/:id')(url.pathname) as { params: Record<string, string> }

			return user.id === Number.parseInt(params.id)
				&& checkIsUserHasAccessToAction(user, UserActionEnum.GetMyUserInfo)
		}
	},
	{
		pathname: '/api/v1/users',
		method: HttpMethod.Get,
		handler: api.v1.users.getAll,
		authRequired: true,
		validateRights: (_: Request, user: IUser) =>
			checkIsUserHasAccessToAction(user, UserActionEnum.GetAnyUserInfo)
	},
	{
		pathname: '/api/v1/users',
		method: HttpMethod.Post,
		handler: api.v1.users.create,
		authRequired: true,
		validateRights: (_: Request, user: IUser) =>
			checkIsUserHasAccessToAction(user, UserActionEnum.CreateUser)
	},
	{
		pathname: '/api/v1/users/:id',
		method: HttpMethod.Patch,
		handler(req: Request) {
			const url = new URL(req.url)
			const { params } = match('/api/v1/users/:id')(url.pathname) as { params: Record<string, string> }

			return api.v1.users.update(req, params)
		},
		authRequired: true,
		validateRights: async (req: Request, user: IUser) => {
			if (checkIsUserHasAccessToAction(user, UserActionEnum.UpdateAnyUserInfo)) {
				return true
			}

			const url = new URL(req.url)
			const { params } = match('/api/v1/users/:id')(url.pathname) as { params: Record<string, string> }
			const userToChangeId = Number.parseInt(params.id)
			const userToChange = await getUserFromFromService({ id: userToChangeId })

			if (userToChange.role === UserRoleEnum.User
				&& checkIsUserHasAccessToAction(user, UserActionEnum.UpdateAnyUserWuthRoleUserInfo)) {
				return true
			}

			if (userToChange.role === UserRoleEnum.Admin
				&& checkIsUserHasAccessToAction(user, UserActionEnum.UpdateAnyUserWuthRoleAdminInfo)) {
				return true
			}

			return user.id === userToChangeId
				&& checkIsUserHasAccessToAction(user, UserActionEnum.UpdateMyUserInfo)
		}
	},
	{
		pathname: '/api/v1/files',
		method: HttpMethod.Post,
		handler: api.v1.files.upload,
		authRequired: true,
		validateRights: (_: Request, user: IUser) =>
			checkIsUserHasAccessToAction(user, UserActionEnum.UploadFiles)
	},
	{
		pathname: '/api/v1/files',
		method: HttpMethod.Get,
		handler: api.v1.files.getAll,
		authRequired: true,
		validateRights: (req: Request, user: IUser) => {
			if (checkIsUserHasAccessToAction(user, UserActionEnum.GetAnyFileInfo)) {
				return true
			}

			const { searchParams } = new URL(req.url)
			const uploadedByUserId = Number.parseInt(searchParams.get('uploadedByUserId') || '0')

			return user.id === uploadedByUserId && checkIsUserHasAccessToAction(user, UserActionEnum.GetMyFileInfo)
		}
	},
	{
		pathname: '/api/v1/files/:id',
		method: HttpMethod.Get,
		handler(req: Request) {
			const url = new URL(req.url)
			const { params } = match('/api/v1/files/:id')(url.pathname) as { params: Record<string, string> }

			return api.v1.files.getById(req, params)
		},
		authRequired: true,
		validateRights: async (req: Request, user: IUser) => {
			if (checkIsUserHasAccessToAction(user, UserActionEnum.GetAnyFileInfo)) {
				return true
			}

			const url = new URL(req.url)
			const { params } = match('/api/v1/files/:id')(url.pathname) as { params: Record<string, string> }
			const fileGetId = Number.parseInt(params.id)

			const fileToDelete = await getFileFromService({ id: fileGetId })

			return user.id === fileToDelete.uploadedByUserId
			&& checkIsUserHasAccessToAction(user, UserActionEnum.GetMyFileInfo)
		}
	},
	{
		pathname: '/api/v1/files/:id',
		method: HttpMethod.Delete,
		handler(req: Request) {
			const url = new URL(req.url)
			const { params } = match('/api/v1/files/:id')(url.pathname) as { params: Record<string, string> }

			return api.v1.files.deleteById(req, params)
		},
		authRequired: true,
		validateRights: async (req: Request, user: IUser) => {
			if (checkIsUserHasAccessToAction(user, UserActionEnum.DeleteAnyFileInfo)) {
				return true
			}

			const url = new URL(req.url)
			const { params } = match('/api/v1/files/:id')(url.pathname) as { params: Record<string, string> }
			const fileToDeleteId = Number.parseInt(params.id)

			const fileToDelete = await getFileFromService({ id: fileToDeleteId })

			return user.id === fileToDelete.uploadedByUserId
			&& checkIsUserHasAccessToAction(user, UserActionEnum.DeleteMyFileInfo)
		}
	},
	{
		pathname: '/api/v1/session',
		method: HttpMethod.Get,
		handler: api.v1.sessions.getCurrentSession,
		authRequired: true,
		validateRights: () => true
	},
	{
		pathname: '/api/v1/sessions',
		method: HttpMethod.Get,
		handler: api.v1.sessions.getAll,
		authRequired: true,
		validateRights: (_: Request, user: IUser) =>
			checkIsUserHasAccessToAction(user, UserActionEnum.GetAnySession)
	},
	{
		pathname: '/api/v1/sessions',
		method: HttpMethod.Post,
		handler: api.v1.sessions.create,
		authRequired: false,
		validateRights: () => true
	},
	{
		pathname: '/api/v1/sessions/:id',
		method: HttpMethod.Delete,
		handler(req: Request) {
			const url = new URL(req.url)
			const { params } = match('/api/v1/sessions/:id')(url.pathname) as { params: Record<string, string> }

			return api.v1.sessions.deleteById(req, params)
		},
		authRequired: true,
		validateRights: async (req: Request, user: IUser) => {
			if (checkIsUserHasAccessToAction(user, UserActionEnum.DeleteAnySession)) {
				return true
			}

			const url = new URL(req.url)
			const { params } = match('/api/v1/sessions/:id')(url.pathname) as { params: Record<string, string> }
			const sessionToDelete = await getSessionByIdFromService(Number.parseInt(params.id))

			return user.id === sessionToDelete.userId
				&& checkIsUserHasAccessToAction(user, UserActionEnum.DeleteMySession)
		}
	},
	{
		pathname: '/api/v1/registrations',
		method: HttpMethod.Get,
		handler: api.v1.registrations.getAll,
		authRequired: true,
		validateRights: (_: Request, user: IUser) =>
			checkIsUserHasAccessToAction(user, UserActionEnum.GetAnyRegistration)
	},
	{
		pathname: '/api/v1/registrations',
		method: HttpMethod.Post,
		handler: api.v1.registrations.create,
		authRequired: false,
		validateRights: () => true
	},
	{
		pathname: '/api/v1/registrations',
		method: HttpMethod.Patch,
		handler: api.v1.registrations.confirm,
		authRequired: false,
		validateRights: () => true
	},
	{
		pathname: '/api/v1/registrations/:id',
		method: HttpMethod.Delete,
		handler(req: Request) {
			const url = new URL(req.url)
			const { params } = match('/api/v1/registrations/:id')(url.pathname) as { params: Record<string, string> }

			return api.v1.registrations.deleteById(req, params)
		},
		authRequired: true,
		validateRights: (_: Request, user: IUser) =>
			checkIsUserHasAccessToAction(user, UserActionEnum.DeleteAnyRegistration)
	}
]

export default routes
