import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../../src/app'

describe('POST /api/token', () => {

	it('returns a token for a valid email', async () => {
		const res = await request(app)
			.post('/api/token')
			.send({ email: 'foo@gmail.com' })

		expect(res.status).toBe(200)
		expect(res.body.token).toBeDefined()
		expect(typeof res.body.token).toBe('string')
	})

	it('rejects invalid email', async () => {
		const res = await request(app)
			.post('/api/token')
			.send({ email: 'dani@test' })

		expect(res.status).toBe(401)
	})

	it('rejects when email is not given', async () => {
		const res = await request(app)
			.post('/api/token')
			.send({ hello: 'World' })

		expect(res.status).toBe(401)
	})
})
