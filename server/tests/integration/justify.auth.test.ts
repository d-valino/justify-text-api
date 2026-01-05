import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../../src/app'

describe('POST /api/justify (auth)', () => {

	it('rejects request without token', async () => {
		const res = await request(app)
			.post('/api/justify')
			.set('Content-Type', 'text/plain')
			.send('Hello world')

		expect(res.status).toBe(401)
	})

	it('accepts request with valid token', async () => {
		// Get token
		const tokenRes = await request(app)
			.post('/api/token')
			.send({ email: 'foo@gmail.com' })

		const token = tokenRes.body.token

		// Do request to justify
		const res = await request(app)
			.post('/api/justify')
			.set('Authorization', `Bearer ${token}`)
			.set('Content-Type', 'text/plain')
			.send('Hello world')

		expect(res.status).toBe(200)
		expect(res.text).toContain('Hello')
	})

	it('rejects text over 80k words', async () => {
		// Generate 80 001 words
		const bigText = Array(80001).fill('word').join(' ');

		const tokenRes = await request(app)
			.post('/api/token')
			.send({ email: 'test1@gmail.com' });

		const token = tokenRes.body.token;

		const res = await request(app)
			.post('/api/justify')
			.set('Authorization', `Bearer ${token}`)
			.set('Content-Type', 'text/plain')
			.send(bigText);

		expect(res.status).toBe(402);
		expect(res.body.error).toBe('Payment Required');
	});

	it('accepts text under 80k words', async () => {
		const text = Array(80000).fill('word').join(' ');

		const tokenRes = await request(app)
			.post('/api/token')
			.send({ email: 'test2@gmail.com' });

		const token = tokenRes.body.token;

		const res = await request(app)
			.post('/api/justify')
			.set('Authorization', `Bearer ${token}`)
			.set('Content-Type', 'text/plain')
			.send(text);


		expect(res.status).toBe(200);
		expect(res.text).toBeDefined();
	});

})
