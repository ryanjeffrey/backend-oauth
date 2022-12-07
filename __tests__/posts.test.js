const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/Github');
const agent = request.agent(app);

describe('post routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('get allows authenticated user to view all posts', async () => {
    await agent.get('/api/v1/github/callback?code=42');
    const res = await agent.get('/api/v1/posts');
    expect(res.status).toEqual(200);
  });

  it('post route allows authenticated users to create posts linked to their id', async () => {
    const testPost = {
      title: 'Test Post',
      content: 'This test post is limited to 255 characters.',
    };

    await agent.get('/api/v1/github/callback?code=42');
    const res = await agent.post('/api/v1/posts').send(testPost);
    expect(res.status).toBe(200);
    expect(res.body).toMatchInlineSnapshot(`
      Object {
        "content": "This test post is limited to 255 characters.",
        "id": "1",
        "title": "Test Post",
        "userId": "1",
      }
    `);
  });

  afterAll(() => {
    pool.end();
  });
});
