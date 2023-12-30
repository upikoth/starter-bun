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
		authRequired: false
	},
	{
		pathname: '/api/v1/users',
		method: HttpMethod.Get,
		handler: api.v1.users.getAll,
		authRequired: false
	},
	{
		pathname: '/api/v1/users',
		method: HttpMethod.Post,
		handler: api.v1.users.create,
		authRequired: false
	},
	{
		pathname: '/api/v1/users/:id',
		method: HttpMethod.Patch,
		handler: function(req: Request) {
			const url = new URL(req.url)
			const { params } = match('/api/v1/users/:id')(url.pathname) as { params: Record<string, string> }

			return api.v1.users.update(req, params)
		},
		authRequired: false
	},
	{
		pathname: '/api/v1/sessions',
		method: HttpMethod.Post,
		handler: api.v1.sessions.create,
		authRequired: false
	}
]

export default routes
