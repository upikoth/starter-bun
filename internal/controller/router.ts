import { match } from 'path-to-regexp'

import { HttpMethod } from '@/constants'

import api from './api'

interface IRoute {
	pathname: string;
	method: HttpMethod;
	handler: (req: Request) => Promise<Response> | Response;
	authRequired: boolean;
}

const routes: IRoute[] = [
	{
		pathname: '/api/v1/health',
		method: HttpMethod.Get,
		handler: api.v1.health.get,
		authRequired: false
	},
	{
		pathname: '/api/v1/users/:id',
		method: HttpMethod.Get,
		handler: function(req: Request) {
			const url = new URL(req.url)
			const { params } = match('/api/v1/users/:id')(url.pathname) as { params: Record<string, string> }

			return api.v1.users.get(req, params)
		},
		authRequired: true
	},
	{
		pathname: '/api/v1/users',
		method: HttpMethod.Get,
		handler: api.v1.users.getAll,
		authRequired: true
	},
	{
		pathname: '/api/v1/users',
		method: HttpMethod.Post,
		handler: api.v1.users.create,
		authRequired: true
	},
	{
		pathname: '/api/v1/users/:id',
		method: HttpMethod.Patch,
		handler: function(req: Request) {
			const url = new URL(req.url)
			const { params } = match('/api/v1/users/:id')(url.pathname) as { params: Record<string, string> }

			return api.v1.users.update(req, params)
		},
		authRequired: true
	},
	{
		pathname: '/api/v1/session',
		method: HttpMethod.Get,
		handler: api.v1.sessions.getCurrentSession,
		authRequired: true
	},
	{
		pathname: '/api/v1/sessions',
		method: HttpMethod.Get,
		handler: api.v1.sessions.getAll,
		authRequired: true
	},
	{
		pathname: '/api/v1/sessions',
		method: HttpMethod.Post,
		handler: api.v1.sessions.create,
		authRequired: false
	},
	{
		pathname: '/api/v1/sessions/:id',
		method: HttpMethod.Delete,
		handler: function(req: Request) {
			const url = new URL(req.url)
			const { params } = match('/api/v1/sessions/:id')(url.pathname) as { params: Record<string, string> }

			return api.v1.sessions.delete(req, params)
		},
		authRequired: true
	},
	{
		pathname: '/api/v1/registrations',
		method: HttpMethod.Get,
		handler: api.v1.registrations.getAll,
		authRequired: true
	},
	{
		pathname: '/api/v1/registrations',
		method: HttpMethod.Post,
		handler: api.v1.registrations.create,
		authRequired: false
	},
	{
		pathname: '/api/v1/registrations',
		method: HttpMethod.Patch,
		handler: api.v1.registrations.confirm,
		authRequired: false
	}
]

export default routes
