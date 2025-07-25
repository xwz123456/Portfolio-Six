const request = require('supertest');
const app = require('../app');

describe('GET /api/assets/:userId', () => {
    it('should return all assets for a valid user ID', async () => {
        const res = await request(app).get('/api/assets/1');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return 400 for an invalid user ID', async () => {
        const res = await request(app).get('/api/assets/invalid');
        expect(res.statusCode).toBe(400);
    });

    it('should return 400 for a non-numeric user ID', async () => {
        const res = await request(app).get('/api/assets/abc123');
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Invalid user ID format');
    });
});
