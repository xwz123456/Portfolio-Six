const request = require('supertest');
const app = require('../app');

describe('GET /api/assets/findAllAssets/:userId', () => {
  it('should return all assets for a valid user ID', async () => {
    const res = await request(app).get('/api/assets/findAllAssets/1');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return 400 for an invalid user ID', async () => {
    const res = await request(app).get('/api/assets/findAllAssets/invalid');
    expect(res.statusCode).toBe(400);
  });

  it('should return 400 for a non-numeric user ID', async () => {
    const res = await request(app).get('/api/assets/findAllAssets/abc123');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid user ID format');
  });
});

describe('GET /api/assets/totalAssetsHistoryInfo/:userId', () => {
  it('should return total assets history for a valid user ID', async () => {
    const res = await request(app).get('/api/assets/totalAssetsHistoryInfo/1');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return 400 for an invalid user ID', async () => {
    const res = await request(app).get(
      '/api/assets/totalAssetsHistoryInfo/invalid'
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid user ID format');
  });

  it('should return 400 for a non-numeric user ID', async () => {
    const res = await request(app).get(
      '/api/assets/totalAssetsHistoryInfo/abc123'
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid user ID format');
  });
});
